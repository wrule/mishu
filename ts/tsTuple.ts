
import { JsArray } from '../js/jsArray';
import { JsField } from '../js/jsField';
import { JsUndefined } from '../js/jsUndefined';
import { TupleField } from '../proto/tuple';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { DefineModel } from './defineModel';
import { TsField } from './tsField';
import { TsMerger } from './tsMerger';
import { TsUndefined } from './tsUndefined';
import { TsUnion } from './tsUnion';

export class TsTuple extends TupleField implements TsField {
  constructor(
    name: string,
    elements: TsField[],
  ) {
    super(name, elements);
  }

  public get Elements() {
    return this.elements as TsField[];
  }

  @BeforeContain()
  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      return (
        this.Elements.length === tupleField.Elements.length &&
        this.Elements.every(
          (element, index) => element.Contain(tupleField.Elements[index])
        )
      );
    } else {
      return false;
    }
  }

  @BeforeCompare()
  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      const maxLength = this.Elements.length > tupleField.Elements.length ?
        this.Elements.length :
        tupleField.Elements.length;
      let sum = 0;
      for (let i = 0; i < maxLength; ++i) {
        const field1 = this.Elements[i];
        const field2 = tupleField.Elements[i];
        if (field1 && field2) {
          sum += field1.Compare(field2);
        }
      }
      return sum / (maxLength || 1);
    } else if (tsField.Type === EType.Array) {
      return tsField.Compare(this);
    } else {
      return 0;
    }
  }

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple
      const similarity = this.Compare(tupleField);
      if (similarity >= 0.2) {
        const maxLength = this.Elements.length > tupleField.Elements.length ?
          this.Elements.length :
          tupleField.Elements.length;
        const newElements: TsField[] = [];
        for (let i = 0; i < maxLength; ++i) {
          const field1 = this.Elements[i] || new TsUndefined(`element${i}`);
          const field2 = tupleField.Elements[i] || new TsUndefined(`element${i}`);
          newElements.push(field1.Merge(field2));
        }
        return new TsTuple(this.Name, newElements);
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
      if (jsArrayField.Elements.length <= this.Elements.length) {
        return this.Elements.every((tsElement, index) => (
          tsElement.Define(
            jsArrayField.Elements[index] ||
            new JsUndefined(`element${index}`)
          )
        ));
      }
    }
    return false;
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    const tsField = jsField.ToTs();
    if (jsField.Type === EType.Array) {
      if (this.Compare(tsField) >= 0.2) {
        const jsArrayField = jsField as JsArray;
        const maxLength = this.Elements.length >= jsArrayField.Elements.length ?
          this.Elements.length :
          jsArrayField.Elements.length;
        const newElements: TsField[] = [];
        for (let i = 0; i < maxLength; ++i) {
          const updateTsField = this.Elements[i];
          const updateJsField = jsArrayField.Elements[i];
          if (!updateTsField && updateJsField) {
            newElements.push((new TsUndefined(`element${i}`).Update(updateJsField)));
          } else if (updateTsField && !updateJsField) {
            newElements.push(updateTsField.Update(new JsUndefined(`element${i}`)));
          } else {
            newElements.push(updateTsField.Update(updateJsField));
          }
        }
        return TsMerger.ArrayMerge(this.Name, newElements);
      }
    }
    return this.Merge(tsField);
  }

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
      elements: this.Elements.map((element) => element.ToJsonObject()),
    };
  }

  public ToDefineModel() {
    return new DefineModel(this.Name);
  }
}
