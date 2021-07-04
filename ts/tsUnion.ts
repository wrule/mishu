
import { UnionField } from '../proto/union';
import { EType } from '../type';
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

  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Union) {

    } else {
      return 0;
    }
  }

  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Union) {
      const unionField = tsField as TsUnion;
      return unionField.Members.every(
        (member) => this.Contain(member)
      );
    } else {
      return this.Members.some(
        (member) => member.Contain(tsField)
      );
    }
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
