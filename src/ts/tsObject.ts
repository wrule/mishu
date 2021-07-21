
import { JsField } from '../js/jsField';
import { JsObject } from '../js/jsObject';
import { JsUndefined } from '../js/jsUndefined';
import { ObjectField } from '../proto/object';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { IModel } from './model';
import { ModelLoader } from './modelLoader';
import { TsField } from './tsField';
import { TsUndefined } from './tsUndefined';
import { TsUnion } from './tsUnion';
import { CodeObject } from './codeModel/codeObject';
import { CodeModel } from './codeModel/codeModel';

export class TsObject extends ObjectField implements TsField {
  constructor(
    name: string,
    fieldsMap: Map<string, TsField>,
  ) {
    super(name, fieldsMap);
  }

  public get FieldsMap() {
    return this.fieldsMap as Map<string, TsField>;
  }

  public get Fields() {
    return Array.from(this.FieldsMap.values());
  }

  public Clone(name?: string): TsField {
    const model = this.ToModel();
    if (name !== undefined) {
      model.name = name;
    }
    return ModelLoader.Load(model);
  }

  @BeforeContain()
  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      return (
        objectField.Fields.length === this.Fields.length &&
        objectField.Fields.every(
          (field) => this.FieldsMap.has(field.Name)
        ) &&
        objectField.Fields.every(
          (field) => (this.FieldsMap.get(field.Name) as TsField).Contain(field)
        )
      );
    } else {
      return false;
    }
  }

  @BeforeCompare()
  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      const maxLength = Array.from(new Set(
        this.Fields
          .map((field) => field.Name)
          .concat(objectField.Fields.map((field) => field.Name))
      )).length;
      const cmpFields = this.Fields.filter(
        (field) => objectField.FieldsMap.has(field.Name)
      );
      let sum = 0;
      cmpFields.forEach((field) => {
        sum += field.Compare(
          objectField.FieldsMap.get(field.Name) as TsField
        ) * 0.6 + 0.4;
      });
      return sum / (maxLength || 1);
    } else {
      return 0;
    }
  }

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      const similarity = this.Compare(objectField);
      if (similarity >= 0.2) {
        const allFieldNames = Array.from(
          new Set(
            this.Fields
              .map((field) => field.Name)
              .concat(objectField.Fields.map((field) => field.Name))
          )
        );
        const newFields = allFieldNames.map((name) => {
          const field1 = this.FieldsMap.get(name) || new TsUndefined(name);
          const field2 = objectField.FieldsMap.get(name) || new TsUndefined(name);
          return field1.Merge(field2);
        });
        const newFieldsMap = new Map<string, TsField>(
          newFields.map((field) => [field.Name, field])
        );
        return new TsObject(this.Name, newFieldsMap);
      } else {
        return new TsUnion(this.Name, [this, objectField]);
      }
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }

  @BeforeDefine()
  public Define(jsField: JsField) {
    if (jsField.Type === EType.Object) {
      const jsObjectField = jsField as JsObject;
      if (jsObjectField.Fields.length <= this.Fields.length) {
        const allFieldNames = Array.from(new Set(
          this.Fields
            .map((field) => field.Name)
            .concat(jsObjectField.Fields.map((field) => field.Name))
        ));
        return allFieldNames.every((fieldName) => {
          const defTsField = this.FieldsMap.get(fieldName);
          const defJsField = jsObjectField.FieldsMap.get(fieldName) || new JsUndefined(fieldName);
          return defTsField && defTsField.Define(defJsField);
        });
      }
    }
    return false;
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    const tsField = jsField.ToTs();
    if (jsField.Type === EType.Object) {
      if (this.Compare(tsField) >= 0.2) {
        const jsObjectField = jsField as JsObject;
        const allFieldNames = Array.from(new Set(
          this.Fields
            .map((field) => field.Name)
            .concat(jsObjectField.Fields.map((field) => field.Name))
        ));
        const newTsFields = allFieldNames.map((fieldName) => {
          const updateTsField = this.FieldsMap.get(fieldName);
          const updateJsField = jsObjectField.FieldsMap.get(fieldName);
          if (!updateTsField && updateJsField) {
            return updateJsField.ToTs();
          }
          if (updateTsField && !updateJsField) {
            return updateTsField.Update(new JsUndefined(fieldName));
          }
          return (updateTsField as TsField).Update(updateJsField as JsField);
        });
        return new TsObject(this.Name, new Map<string, TsField>(
          newTsFields.map((field) => [field.Name, field])
        ));
      }
    }
    return this.Merge(tsField);
  }

  public ToModel(): IModel {
    return {
      type: this.Type,
      name: this.Name,
      fields: this.Fields.map((field) => field.ToModel()),
    };
  }

  public ToCodeModel(parent?: CodeModel) {
    return new CodeObject(this, parent);
  }

  public DomainTsFields(): TsField[] {
    return [this];
  }
}
