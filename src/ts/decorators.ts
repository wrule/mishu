import { JsField } from '../js/jsField';
import { EType } from '../type';
import { ModelLoader } from './modelLoader';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

// export function BeforeClone() {
//   return function (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) {
//     const original = descriptor.value;
//     descriptor.value = function(...args: any[]) {
//       const that = this as TsField;
//       const name = args[0] as string | undefined;
//       const model = that.ToModel();
//       if (name !== undefined) {
//         model.name = name;
//       }
//       return ModelLoader.Load(model);
//     };
//     return descriptor;
//   };
// }

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
      if (
        tsField.Type === EType.Unknow ||
        that.Type === EType.Unknow
      ) {
        return false;
      }
      if (tsField.Hash() === that.Hash()) {
        return true;
      }
      if (
        tsField.Type === EType.Union &&
        that.Type !== EType.Union
      ) {
        const unionField = tsField as TsUnion;
        return unionField.Members
          .every((member) => that.Contain(member));
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
      if (
        tsField.Type === EType.Unknow ||
        that.Type === EType.Unknow
      ) {
        return 0;
      }
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
        return that.Clone();
      }
      if (that.Contain(tsField)) {
        return that.Clone();
      }
      if (tsField.Type === EType.Unknow) {
        return that.Clone();
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

export function BeforeDefine() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const that = this as TsField;
      const jsField = args[0] as JsField;
      if (
        jsField.Type === EType.Unknow ||
        that.Type === EType.Unknow
      ) {
        return false;
      }
      if (jsField.Hash() === that.Hash()) {
        return true;
      }
      const result = original.apply(this, args);
      return result;
    };
    return descriptor;
  };
}

export function BeforeUpdate() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const that = this as TsField;
      const jsField = args[0] as JsField;
      if (jsField.Hash() === that.Hash()) {
        return that.Clone();
      }
      const result = original.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
