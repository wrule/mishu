import { EType } from '../type';
import { JsField } from './jsField';

export class JsDate extends JsField {
  constructor(name: string) {
    super(name, EType.Date);
  }
}
