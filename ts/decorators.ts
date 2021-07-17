import { EType } from '../type';
import { TsField } from './tsField';

export function BeforeCompare() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const that = this as TsField;
      const tsField = args[0] as TsField;
      if (tsField.Hash() === that.Hash()) {
        return 1;
      }
      if (
        tsField.Type === EType.Union &&
        that.Type !== EType.Union
      ) {
        return tsField.Compare(that);
      }
      const result = original.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
