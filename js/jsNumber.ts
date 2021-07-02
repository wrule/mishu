import { EType } from '../type';
import { JsField } from './jsField';

export class JsNumber extends JsField {
  constructor(name: string) {
    super(name, EType.Number);
  }
}
