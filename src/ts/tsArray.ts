
import { JsArray } from '../js/jsArray';
import { JsField } from '../js/jsField';
import { ArrayField } from '../proto/array';
import { EType } from '../type';
import { CodeArray } from './codeModel/codeArray';
import { CodeModel } from './codeModel/codeModel';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { IModel } from './model';
import { ModelLoader } from './modelLoader';
import { TsField } from './tsField';
import { TsMerger } from './tsMerger';
import { TsTuple } from './tsTuple';
import { TsUnion } from './tsUnion';

export class TsArray extends ArrayField implements TsField {
  constructor(
    name: string,
    element: TsField,
  ) {
    super(name, element);
  }

  public get Element() {
    return this.element as TsField;
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
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      return this.Element.Contain(arrayField.Element);
    } else if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      return tupleField.Elements.every(
        (element) => this.Element.Contain(element)
      );
    } else {
      return false;
    }
  }

  @BeforeCompare()
  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      return this.Element.Compare(arrayField.Element) * 0.9 + 0.1;
    } else if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      const similarities = tupleField.Elements.map(
        (element) => this.Element.Compare(element)
      );
      const similarity = similarities.length > 0 ?
        Math.min(...similarities) :
        0;
      return (similarity * 0.95) + 0.05;
    } else {
      return 0;
    }
  }

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      if (this.Element.Compare(arrayField.Element) >= 0.2) {
        return new TsArray(
          this.Name,
          this.Element.Merge(arrayField.Element)
        );
      } else {
        return new TsUnion(this.Name, [this, arrayField]);
      }
    } else if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      if (this.Compare(tupleField) >= 0.2) {
        const element = TsMerger.Optimize(
          'element',
          [this.Element, ...tupleField.Elements],
        );
        return new TsArray(this.Name, element);
      } else {
        return new TsUnion(this.Name, [this, tupleField]);
      }
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }

  @BeforeDefine()
  public Define(jsField: JsField) {
    if (jsField.Type === EType.Array) {
      const jsArrayField = jsField as JsArray;
      return jsArrayField.Elements
        .every((jsElement) => this.Element.Define(jsElement));
    }
    return false;
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    const tsField = jsField.ToTs();
    if (jsField.Type === EType.Array) {
      if (this.Compare(tsField) >= 0.2) {
        const jsArrayField = jsField as JsArray;
        let updatedDst = this.Element;
        jsArrayField.Elements.forEach((jsElement) => {
          updatedDst = updatedDst.Update(jsElement);
        });
        return new TsArray(this.Name, updatedDst);
      }
    }
    return this.Merge(tsField);
  }

  public ToModel(): IModel {
    return {
      type: this.Type,
      name: this.Name,
      element: this.Element.ToModel(),
    };
  }

  public ToCodeModel(parent?: CodeModel) {
    return new CodeArray(this, parent);
  }
}
