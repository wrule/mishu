import { JsUndefined } from './jsUndefined';
import { JsNull } from './jsNull';
import { JsBoolean } from './jsBoolean';
import { JsNumber } from './jsNumber';
import { JsString } from './jsString';
import { JsDate } from './jsDate';
import { JsUnknow } from './jsUnknow';
import { JsObject } from './jsObject';
import { JsArray } from './jsArray';
import { JsField } from './jsField';

export class JsFieldFactory {
  public static Create(name: string, value: any): JsField {
    const protName = Object.prototype.toString.call(value);
    switch (protName) {
      case '[object Undefined]':
        return new JsUndefined(name);
      case '[object Null]':
        return new JsNull(name);
      case '[object Boolean]':
        return new JsBoolean(name);
      case '[object Number]':
        return new JsNumber(name);
      case '[object String]':
        return new JsString(name);
      case '[object Date]':
        return new JsDate(name);
      case '[object Object]': {
        const fieldsMap = new Map<string, JsField>(
          Object.entries(value)
            .map(
              ([name, value]) => [name, JsFieldFactory.Create(name, value)]
            )
        );
        return new JsObject(name, fieldsMap);
      }
      case '[object Array]': {
        const elements = (value as any[]);
        return new JsArray(
          name,
          elements.map(
            (element, index) => JsFieldFactory.Create(`element${index}`, element)
          ),
        );
      }
    }
    return new JsUnknow(name);
  }
}
