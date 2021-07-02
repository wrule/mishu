import { EType } from '../type';
import { JsField } from './jsfield';

export class JsBoolean extends JsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }
}
