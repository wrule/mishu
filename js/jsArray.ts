import { ArrayField } from '../proto/array';
import { TsMerger } from '../ts/tsMerger';
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

  public get Element() {
    return this.element as JsField;
  }

  public ToTs() {
    const tsElements = this.Elements.map((element) => element.ToTs());
    return TsMerger.ArrayMerge(this.Name, tsElements);
  }
}
