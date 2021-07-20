import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { DefineModel } from './defineModel';
import { IModel } from './model';

export interface TsField extends Field {
  Clone(name?: string): TsField;

  Contain(tsField: TsField): boolean;

  Compare(tsField: TsField): number;

  Merge(tsField: TsField): TsField;

  Define(jsField: JsField): boolean;

  Update(jsField: JsField): TsField;

  ToModel(): IModel;

  ToDefineModel(): DefineModel;
}