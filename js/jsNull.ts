import { TsNull } from '../ts/tsNull';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsNull extends JsField {
  constructor(name: string) {
    super(name, EType.Null);
  }

  public ToTs() {
    return new TsNull(this.Name);
  }
}
