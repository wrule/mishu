import { EType } from '../type';
import { JsField } from './jsfield';

export class JsUnknow extends JsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }
}
