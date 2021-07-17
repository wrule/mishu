import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeMerge } from './decorators';
import { TsField } from './tsField';

export class TsUnknow extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public Contain(tsField: TsField) {
    return false;
  }

  // 这里不需要@BeforeCompare()，Unknow总是返回0
  public Compare(tsField: TsField) {
    return 0;
  }

  // @BeforeMerge()，不需要
  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Unknow) {
      return new TsUnknow(this.Name);
    } else {
      // TODO 这边应该拷贝
      return tsField;
    }
  }
}
