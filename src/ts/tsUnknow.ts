import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { EType } from '../type';
import { CodeModel } from './codeModel/codeModel';
import { CodeUnknow } from './codeModel/codeUnknow';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { IModel } from './model';
import { ModelLoader } from './modelLoader';
import { TsField } from './tsField';

export class TsUnknow extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public Clone(name?: string): TsField {
    const model = this.ToModel();
    if (name !== undefined) {
      model.name = name;
    }
    return ModelLoader.Load(model);
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

  public ToModel(): IModel {
    return {
      type: this.Type,
      name: this.Name,
    };
  }

  public ToCodeModel(parent?: CodeModel) {
    return new CodeUnknow(this, parent);
  }

  public DomainTsFields(): TsField[] {
    return [];
  }
}
