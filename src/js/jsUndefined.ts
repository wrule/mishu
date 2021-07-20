import { Field } from '../proto/field';
import { TsUndefined } from '../ts/tsUndefined';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsUndefined extends Field implements JsField {
  constructor(name: string) {
    super(name, EType.Undefined);
  }

  public ToTs() {
    return new TsUndefined(this.Name);
  }
}
