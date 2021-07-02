import { EType } from '../type';
import { JsField } from './jsField';

export class JsUndefined extends JsField {
  constructor(name: string) {
    super(name, EType.Undefined);
  }
}
