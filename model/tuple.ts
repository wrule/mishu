import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class TupleField extends Field {
  public Hash() {
    return StringHash(
      this.elements
        .map((element) => element.Hash())
        .join(',')
    );
  }

  constructor(
    name: string,
    private elements: Field[],
  ) {
    super(name, EType.Tuple);
  }
}
