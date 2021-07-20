import { Field } from '../proto/field';
import { TsField } from '../ts/tsField';

export interface JsField extends Field {
  ToTs(): TsField;
}
