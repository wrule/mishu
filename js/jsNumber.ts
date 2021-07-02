import { EType } from '../type';
import { JsField } from './jsfield';

export class JsNumber extends JsField {
  constructor(name: string) {
    super(name, EType.Number);
  }
}
