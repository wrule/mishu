
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
    const newMembers: TsField[] = [];
    if (tsField.Type === EType.Union) {
      const unionField = tsField as TsUnion;
      newMembers.push(...unionField.Members);
    } else {
      newMembers.push(tsField);
    }
    return { } as any;
  }
}
