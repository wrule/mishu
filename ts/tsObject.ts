
import { ObjectField } from '../proto/object';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeMerge } from './decorators';
import { TsField } from './tsField';
import { TsUndefined } from './tsUndefined';
import { TsUnion } from './tsUnion';

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

  @BeforeCompare()
  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      const maxLength = this.Fields.length > objectField.Fields.length ?
        this.Fields.length :
        objectField.Fields.length;
      const cmpFields = this.Fields.filter(
        (field) => objectField.FieldsMap.has(field.Name)
      );
      const passRate = cmpFields.length / (maxLength || 1);
      let sum = 0;
      cmpFields.forEach((field) => {
        sum += field.Compare(
          objectField.FieldsMap.get(field.Name) as TsField
        ) * 0.6 + 0.4;
      });
      return (sum / (cmpFields.length || 1)) * passRate;
    } else {
      return 0;
    }
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
}
