import { ArrayField } from '../proto/array';
import { TsArray } from '../ts/tsArray';
import { TsTuple } from '../ts/tsTuple';
import { TsUnknow } from '../ts/tsUnknow';
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
    // TODO
    return new TsArray(this.Name, this.Elements[0].ToTs());
  }
}
