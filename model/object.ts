import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class ObjectField extends Field {
  public Hash() {
    const fields = this.fields.slice(0);
    fields.sort((a, b) => a.Name.localeCompare(b.Name));
    return StringHash(
      fields
        .map((field) => `${field.Name}:${field.Hash()}`)
        .join(';')
    );
  }

  constructor(
    name: string,
    private fields: Field[],
  ) {
    super(name, EType.Object);
  }
}
