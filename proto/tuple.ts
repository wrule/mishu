import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class TupleField extends Field {
  constructor(
    name: string,
    protected elements: Field[],
  ) {
    super(name, EType.Tuple);
  }

  public get Elements() {
    return this.elements;
  }

  public Hash() {
    return StringHash(
      this.Elements
        .map((element) => element.Hash())
        .join(',')
    );
  }
}
