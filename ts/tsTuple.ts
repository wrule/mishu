
import { TupleField } from '../proto/tuple';
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

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
