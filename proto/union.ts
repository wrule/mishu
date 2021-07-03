import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class UnionField extends Field {
  constructor(
    name: string,
    private members: Field[],
  ) {
    super(name, EType.Union);
  }

  public Hash() {
    const members = this.members.slice(0);
    members.sort((a, b) => a.Hash().localeCompare(b.Hash()));
    return StringHash(
      members
        .map((member) => member.Hash())
        .join('|')
    );
  }
}
