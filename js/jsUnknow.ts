import { Field } from '../proto/field';
import { TsUnknow } from '../ts/tsUnknow';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsUnknow extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public ToTs() {
    return new TsUnknow(this.Name);
  }
}
