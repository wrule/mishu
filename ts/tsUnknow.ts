import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeMerge } from './decorators';
import { TsField } from './tsField';

export class TsUnknow extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  @BeforeContain()
  public Contain(tsField: TsField) {
    return false;
  }

  @BeforeCompare()
  public Compare(tsField: TsField) {
    return 0;
  }

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    return tsField;
  }

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
    };
  }
}
