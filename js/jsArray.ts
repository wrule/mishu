import { ArrayField } from '../proto/array';
import { JsField } from './jsField';
import { JsUnknow } from './jsUnknow';

export class JsArray extends ArrayField implements JsField {
  constructor(
    name: string,
    private elements: JsField[],
  ) {
    super(name, new JsUnknow('element'));
  }

  public get Elements() {
    return this.elements;
  }

  public ToTs() {

  }
}
