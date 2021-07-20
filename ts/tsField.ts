import { JsField } from '../js/jsField';
import { Field } from '../proto/field';
import { DefineModel } from './defineModel';

export interface TsField extends Field {
  Contain(tsField: TsField): boolean;

  Compare(tsField: TsField): number;

  Merge(tsField: TsField): TsField;

  Define(jsField: JsField): boolean;

  Update(jsField: JsField): TsField;

  ToJsonObject(): any;

  ToDefineModel(): DefineModel;
}
