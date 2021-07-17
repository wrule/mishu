import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsNumber extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Number);
  }

  public iCompare(tsField: TsField) {
    return 0;
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Number) {
      return new TsNumber(this.Name);
    } else if (tsField.Type === EType.Union) {
      return tsField.Merge(this);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
