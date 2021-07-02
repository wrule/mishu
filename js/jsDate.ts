import { EType } from '../type';
import { JsField } from './jsfield';

export class JsDate extends JsField {
  constructor(name: string) {
    super(name, EType.Date);
  }
}
