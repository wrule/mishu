import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { DefineModel } from './defineModel';
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

  @BeforeDefine()
  public Define(jsField: JsField) {
    return false;
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    return this.Merge(jsField.ToTs());
  }

  public ToJsonObject() {
    return {
      type: this.Type,
      name: this.Name,
    };
  }

  public ToDefineModel() {
    return new DefineModel('any');
  }
}
