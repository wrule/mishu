import { EType } from '../type';
import { JsField } from './jsfield';

export class JsUndefined extends JsField {
  constructor(name: string) {
    super(name, EType.Undefined);
  }
}
