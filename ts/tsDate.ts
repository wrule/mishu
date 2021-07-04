import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsDate extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Date);
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Date) {
      return new TsDate(this.Name);
    } else if (tsField.Type === EType.Union) {
      return tsField.Merge(this);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
