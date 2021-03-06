import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class ObjectField extends Field {
  constructor(
    name: string,
    protected fieldsMap: Map<string, Field>,
  ) {
    super(name, EType.Object);
  }

  abstract FieldsMap: Map<string, Field>;

  abstract Fields: Field[];

  public Hash() {
    const fields = this.Fields.slice();
    fields.sort((a, b) => a.Name.localeCompare(b.Name));
    return StringHash(
      fields
        .map((field) => `${field.Name}:${field.Hash()}`)
        .join(';')
    );
  }
}
