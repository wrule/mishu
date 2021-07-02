import { EType } from '../type';
import { JsField } from './jsfield';

export class JsNull extends JsField {
  constructor(name: string) {
    super(name, EType.Null);
  }
}
