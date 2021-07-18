import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeMerge } from './decorators';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsNumber extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Number);
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
    return new TsUnion(this.Name, [this, tsField]);
  }

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
    };
  }
}
