
import { TupleField } from '../proto/tuple';
import { EType } from '../type';
import { TsField } from './tsField';

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
      return 1;
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

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
