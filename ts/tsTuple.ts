
import { TupleField } from '../proto/tuple';
import { EType } from '../type';
import { TsField } from './tsField';
import { TsUndefined } from './tsUndefined';
import { TsUnion } from './tsUnion';

export class TsTuple extends TupleField implements TsField {
  constructor(
    name: string,
    elements: TsField[],
  ) {
    super(name, elements);
  }

  public get Elements() {
    return this.elements as TsField[];
  }

  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      const maxLength = this.Elements.length > tupleField.Elements.length ?
        this.Elements.length :
        tupleField.Elements.length;
      let sum = 0;
      for (let i = 0; i < maxLength; ++i) {
        const field1 = this.Elements[i];
        const field2 = tupleField.Elements[i];
        if (field1 && field2) {
          sum += field1.Compare(field2);
        }
      }
      return sum / (maxLength || 1);
    } else if (tsField.Type === EType.Array) {
      return tsField.Compare(this);
    } else {
      return 0;
    }
  }

  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple;
      return (
        this.Elements.length === tupleField.Elements.length &&
        this.Elements.every(
          (element, index) => element.Contain(tupleField.Elements[index])
        )
      );
    } else {
      return false;
    }
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Tuple) {
      const tupleField = tsField as TsTuple
      const similarity = this.Compare(tupleField);
      if (similarity >= 0.2) {
        const maxLength = this.Elements.length > tupleField.Elements.length ?
          this.Elements.length :
          tupleField.Elements.length;
        const newElements: TsField[] = [];
        for (let i = 0; i < maxLength; ++i) {
          const field1 = this.Elements[i] || new TsUndefined(`element${i}`);
          const field2 = tupleField.Elements[i] || new TsUndefined(`element${i}`);
          newElements.push(field1.Merge(field2));
        }
        return new TsTuple(this.Name, newElements);
      } else {
        return new TsUnion(this.Name, [this, tupleField]);
      }
    } else if (tsField.Type === EType.Union) {
      return tsField.Merge(this);
    } else {
      return new TsUnion(this.Name, [this, tsField]);
    }
  }
}
