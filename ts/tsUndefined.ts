import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeMerge } from './decorators';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsUndefined extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Undefined);
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
    if (tsField.Type === EType.Undefined) {
      return new TsUndefined(this.Name);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
