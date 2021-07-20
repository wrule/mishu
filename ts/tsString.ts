import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeMerge } from './decorators';
import { DefineModel } from './defineModel';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsString extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.String);
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

  public Define(jsField: JsField) {
    return false;
  }

  public Update(jsField: JsField): TsField {
    return this as any;
  }

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
    };
  }

  public ToDefineModel() {
    return new DefineModel('string');
  }
}
