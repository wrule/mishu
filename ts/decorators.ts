import { EType } from '../type';
import { TsField } from './tsField';

export function BeforeContain() {
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
        return true;
      }
      const result = original.apply(this, args);
      return result;
    };
    return descriptor;
  };
}

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

export function BeforeMerge() {
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
        return that;
      }
      if (that.Contain(tsField)) {
        return that;
      }
      if (tsField.Type === EType.Unknow) {
        return that;
      }
      if (
        tsField.Type === EType.Array &&
        that.Type === EType.Tuple
      ) {
        return tsField.Merge(that);
      }
      if (
        tsField.Type === EType.Union &&
        that.Type !== EType.Union
      ) {
        return tsField.Merge(that);
      }
      const result = original.apply(this, args);
      return result;
    };
    return descriptor;
  };
}