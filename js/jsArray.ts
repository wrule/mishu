import { ArrayField } from '../proto/array';
import { TsArray } from '../ts/tsArray';
import { TsTuple } from '../ts/tsTuple';
import { TsUnion } from '../ts/tsUnion';
import { TsUnknow } from '../ts/tsUnknow';
import { EType } from '../type';
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
    let mergeDst = new TsUnknow('element');
    tsElements.forEach((element) => {
      mergeDst = mergeDst.Merge(element);
    });
    if (mergeDst.Type === EType.Union) {
      const unionField = mergeDst as TsUnion;
      if (unionField.Members.length / tsElements.length >= 0.6) {

      } else {
        
      }
    } else {
      return new TsArray(this.Name, mergeDst);
    }
    // TODO
    return new TsArray(this.Name, this.Elements[0].ToTs());
  }
}
