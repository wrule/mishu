import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { EType } from '../type';
import { BeforeClone, BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { DefineModel } from './defineModel';
import { IModel } from './model';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsString extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.String);
  }

  @BeforeClone()
  public Clone(name?: string): TsField {
    throw new Error('请为Clone方法添加前置装饰器');
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

  @BeforeDefine()
  public Define(jsField: JsField) {
    return false;
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    return this.Merge(jsField.ToTs());
  }

  public ToModel(): IModel {
    return {
      type: this.Type,
      name: this.Name,
    };
  }

  public ToDefineModel() {
    return new DefineModel('string');
  }
}
