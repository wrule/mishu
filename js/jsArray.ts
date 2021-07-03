import { TsArray } from '../ts/tsArray';
import { TsTuple } from '../ts/tsTuple';
import { TsUnknow } from '../ts/tsUnknow';
import { EType } from '../type';
import { JsField } from './jsField';

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

  public ToTs() {
    const tsElements = this.Elements.map((element) => element.ToTs());
    // 数组结构内在相似性判断
    const similarities: number[] = [];
    for (let i = 0; i < tsElements.length - 1; ++i) {
      for (let j = i + 1; j < tsElements.length; ++j) {
        similarities.push(tsElements[i].Compare(tsElements[j]));
      }
    }
    let sum = 0;
    similarities.forEach((similarity) => sum += similarity);
    const similarity = similarities.length > 0 ?
      sum / similarities.length :
      1;
    // 内在相似性高于0.2则合并为数组
    // 否则视为元组
    if (similarity >= 0.2) {
      let result = new TsUnknow('element');
      tsElements.forEach((element) => {
        result = result.Merge(element);
      });
      return new TsArray(this.Name, result);
    } else {
      return new TsTuple(this.Name, tsElements);
    }
  }
}
