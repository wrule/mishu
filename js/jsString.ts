import { Field } from '../proto/field';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsString extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.String);
  }

  public ToTs() {

  }
}
