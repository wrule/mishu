import { EType } from '../type';
import { JsField } from './jsField';

export class JsNull extends JsField {
  constructor(name: string) {
    super(name, EType.Null);
  }
}
