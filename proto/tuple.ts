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

  public Hash() {
    return StringHash(
      this.elements
        .map((element) => element.Hash())
        .join(',')
    );
  }
}
