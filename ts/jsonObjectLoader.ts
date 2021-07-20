import { EType } from '../type';
import { IJsonObject } from './jsonObject';
import { TsArray } from './tsArray';
import { TsBoolean } from './tsBoolean';
import { TsDate } from './tsDate';
import { TsField } from './tsField';
import { TsNull } from './tsNull';
import { TsNumber } from './tsNumber';
import { TsObject } from './tsObject';
import { TsString } from './tsString';
import { TsTuple } from './tsTuple';
import { TsUndefined } from './tsUndefined';
import { TsUnion } from './tsUnion';
import { TsUnknow } from './tsUnknow';

export class JsonObjectLoader {
  public static Load(jsonObject: IJsonObject): TsField {
    switch (jsonObject.type) {
      case EType.Undefined:
        return new TsUndefined(jsonObject.name);
      case EType.Null:
        return new TsNull(jsonObject.name);
      case EType.Boolean:
        return new TsBoolean(jsonObject.name);
      case EType.Number:
        return new TsNumber(jsonObject.name);
      case EType.String:
        return new TsString(jsonObject.name);
      case EType.Date:
        return new TsDate(jsonObject.name);
      case EType.Object: {
        const fields = jsonObject.fields;
        if (fields) {
          return new TsObject(
            jsonObject.name,
            new Map<string, TsField>(
              fields
                .map((field) => JsonObjectLoader.Load(field))
                .map((field) => [field.Name, field])
            ),
          );
        }
        throw new Error(`${jsonObject.name}下没有fields节点`);
      } break;
      case EType.Array: {
        const element = jsonObject.element;
        if (element) {
          return new TsArray(
            jsonObject.name,
            JsonObjectLoader.Load(element),
          );
        }
        throw new Error(`${jsonObject.name}下没有element节点`);
      }
      case EType.Tuple: {
        const elements = jsonObject.elements;
        if (elements) {
          return new TsTuple(
            jsonObject.name,
            elements.map((element) => JsonObjectLoader.Load(element)),
          );
        }
        throw new Error(`${jsonObject.name}下没有elements节点`);
      } break;
      case EType.Union: {
        const members = jsonObject.members;
        if (members) {
          return new TsUnion(
            jsonObject.name,
            members.map((member) => JsonObjectLoader.Load(member)),
          );
        }
        throw new Error(`${jsonObject.name}下没有members节点`);
      }
      default:
        return new TsUnknow(jsonObject.name);
    }
  }
}
