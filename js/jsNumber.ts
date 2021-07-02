import { TsNumber } from '../ts/tsNumber';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsNumber extends JsField {
  constructor(name: string) {
    super(name, EType.Number);
  }

  public ToTs() {
    return new TsNumber(this.Name);
  }
}
