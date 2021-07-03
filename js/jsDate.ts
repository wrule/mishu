import { Field } from '../proto/field';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsDate extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.Date);
  }

  public ToTs() {

  }
}
