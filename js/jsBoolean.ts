import { Field } from '../proto/field';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsBoolean extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }

  public ToTs() {

  }
}
