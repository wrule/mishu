import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeMerge } from './decorators';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsBoolean extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Boolean);
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
    if (tsField.Type === EType.Boolean) {
      return new TsBoolean(this.Name);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
