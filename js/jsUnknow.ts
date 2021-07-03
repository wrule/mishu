import { Field } from '../proto/field';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsUnknow extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public ToTs() {

  }
}
