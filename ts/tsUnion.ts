
import { UnionField } from '../proto/union';
import { TsField } from './tsField';

export class TsUnion extends UnionField implements TsField {
  constructor(
    name: string,
    members: TsField[],
  ) {
    super(name, members);
  }

  public get Members() {
    return this.members as TsField[];
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
