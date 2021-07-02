import { EType } from '../type';
import { JsField } from './jsfield';

export class JsArray extends JsField {
  public get Elements() {
    return this.elements;
  }

  constructor(
    name: string,
    private elements: JsField[],
  ) {
    super(name, EType.Array);
  }
}
