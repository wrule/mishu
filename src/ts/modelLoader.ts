import { EType } from '../type';
import { IModel } from './model';
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

/**
 * TypeScript模型加载器
 */
export class ModelLoader {
  /**
   * 加载TypeScript模型
   * @param model TypeScript模型
   * @returns TsField
   */
  public static Load(model: IModel): TsField {
    switch (model.type) {
      case EType.Undefined:
        return new TsUndefined(model.name);
      case EType.Null:
        return new TsNull(model.name);
      case EType.Boolean:
        return new TsBoolean(model.name);
      case EType.Number:
        return new TsNumber(model.name);
      case EType.String:
        return new TsString(model.name);
      case EType.Date:
        return new TsDate(model.name);
      case EType.Object: {
        const fields = model.children;
        if (fields) {
          return new TsObject(
            model.name,
            new Map<string, TsField>(
              fields
                .map((field) => ModelLoader.Load(field))
                .map((field) => [field.Name, field])
            ),
          );
        }
        throw new Error(`${model.name}下子级节点缺失`);
      }
      case EType.Array: {
        const children = model.children;
        if (children && children.length > 0) {
          return new TsArray(
            model.name,
            ModelLoader.Load(children[0]),
          );
        }
        throw new Error(`${model.name}下子级节点缺失`);
      }
      case EType.Tuple: {
        const elements = model.children;
        if (elements) {
          return new TsTuple(
            model.name,
            elements.map((element) => ModelLoader.Load(element)),
          );
        }
        throw new Error(`${model.name}下子级节点缺失`);
      } break;
      case EType.Union: {
        const members = model.children;
        if (members) {
          return new TsUnion(
            model.name,
            members.map((member) => ModelLoader.Load(member)),
          );
        }
        throw new Error(`${model.name}下子级节点缺失`);
      }
      default:
        return new TsUnknow(model.name);
    }
  }
}
