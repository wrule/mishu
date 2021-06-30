import { ArrayField } from "./array";
import { BooleanField } from "./boolean";
import { DateField } from "./date";
import { IField } from "./field";
import { NullField } from "./null";
import { NumberField } from "./number";
import { ObjectField } from "./object";
import { StringField } from "./string";
import { TupleField } from "./tuple";
import { EType } from "./type";
import { UndefinedField } from "./undefined";
import { UnknowField } from "./unknow";

export function create(
  name: string,
  value: any,
): IField {
  const protName = Object.prototype.toString.call(value);
  switch (protName) {
    case '[object Undefined]':
      return new UndefinedField(name);
    case '[object Null]':
      return new NullField(name);
    case '[object Boolean]':
      return new BooleanField(name);
    case '[object Number]':
      return new NumberField(name);
    case '[object String]':
      return new StringField(name);
    case '[object Date]':
      return new DateField(name);
    case '[object Object]':
      return new ObjectField(
        name,
        Object.entries(value)
          .map(
            ([name, value]) => create(name, value)
          ),
      );
    case '[object Array]': {
      const valueList = value as any[];
      const fieldList = valueList.map(
        (value, index) => create(`element${index}`, value)
      );
      // 数组结构内在相似性判断
      const similarities: number[] = [];
      for (let i = 0; i < fieldList.length - 1; ++i) {
        for (let j = i + 1; j < fieldList.length; ++j) {
          similarities.push(fieldList[i].Compare(fieldList[j]));
        }
      }
      let sum = 0;
      similarities.forEach((similarity) => sum += similarity);
      const similarity = sum / similarities.length;
      if (similarity >= 0.2) {
        let result = new UnknowField('element');
        fieldList.forEach((field) => {
          result = result.Merge(field);
        });
        return new ArrayField(name, result);
      } else {
        return new TupleField(name, fieldList);
      }
    }
  }
  return new UnknowField(name);
}
