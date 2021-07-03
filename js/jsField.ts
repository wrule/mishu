import { Field } from '../proto/field';

export interface JsField extends Field {
  ToTs(): any;
}
