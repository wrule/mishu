import { EType } from '../type';
import { JsField } from './jsfield';

export class JsString extends JsField {
  constructor(name: string) {
    super(name, EType.String);
  }
}
