import { EType } from '../type';
import { StringHash } from '../utils';
import { Field } from './field';

export abstract class UnionField extends Field {
  constructor(
    name: string,
    protected members: Field[],
  ) {
    super(name, EType.Union);
  }

  abstract Members: Field[];

  public Hash() {
    const members = this.Members.slice();
    members.sort((a, b) => a.Hash().localeCompare(b.Hash()));
    return StringHash(
      members
        .map((member) => member.Hash())
        .join('|')
    );
  }
}
