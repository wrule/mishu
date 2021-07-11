import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class ArrayField extends Field {
  constructor(
    name: string,
    protected element: Field,
  ) {
    super(name, EType.Array);
  }

  public get Element() {
    return this.element;
  }

  public Hash() {
    return StringHash(`${this.Element.Hash()}[]`);
  }
}
