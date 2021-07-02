import { EType } from '../type';
import { JsField } from './jsField';

export class JsUnknow extends JsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }
}
