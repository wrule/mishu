import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class ArrayField extends Field {
  public Hash() {
    return StringHash(`${this.element.Hash()}[]`);
  }

  constructor(
    name: string,
    private element: Field,
  ) {
    super(name, EType.Array);
  }
}
