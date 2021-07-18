
import { ArrayField } from '../proto/array';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeMerge } from './decorators';
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

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
      element: this.Element.ToJsonObject(),
    };
  }
}
