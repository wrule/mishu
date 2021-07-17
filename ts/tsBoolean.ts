import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsBoolean extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }

  public Contain(tsField: TsField) {
    return false;
  }

  public Compare(tsField: TsField) {
    return 0;
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Boolean) {
      return new TsBoolean(this.Name);
    } else if (tsField.Type === EType.Union) {
      return tsField.Merge(this);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
