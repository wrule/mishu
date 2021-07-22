import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { IModel } from './model';
import { CodeModel } from './codeModel/codeModel';

export interface TsField extends Field {
  Clone(name?: string): TsField;

  Contain(tsField: TsField): boolean;

  Compare(tsField: TsField): number;

  Merge(tsField: TsField): TsField;

  Define(jsField: JsField): boolean;

  Update(jsField: JsField): TsField;

  ToModel(): IModel;

  ToCodeModel(parent?: CodeModel): CodeModel;
}
