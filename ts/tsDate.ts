import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeMerge } from './decorators';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsDate extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Date);
  }

  public Contain(tsField: TsField) {
    return false;
  }

  @BeforeCompare()
  public Compare(tsField: TsField) {
    return 0;
  }

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Date) {
      return new TsDate(this.Name);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
