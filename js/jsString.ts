import { EType } from '../type';
import { JsField } from './jsField';

export class JsString extends JsField {
  constructor(name: string) {
    super(name, EType.String);
  }
}
