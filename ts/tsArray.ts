
import { ArrayField } from '../proto/array';
import { EType } from '../type';
import { TsField } from './tsField';
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

  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      return (this.Element.Compare(arrayField.Element) * 0.9) + 0.1;
    } else {
      return 0;
    }
  }

  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      return this.Element.Contain(arrayField.Element);
    } else {
      return false;
    }
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Array) {
      const arrayField = tsField as TsArray;
      return new TsArray(this.Name, this.Element.Merge(arrayField.Element));
    } else if (tsField.Type === EType.Union) {
      return tsField.Merge(this);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
