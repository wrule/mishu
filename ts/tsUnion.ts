
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

  public iCompare(tsField: TsField): number {
    const similarities: number[] = [];
    if (tsField.Type === EType.Union) {
      const unionField = tsField as TsUnion;
      for (let i = 0; i < this.Members.length; ++i) {
        for (let j = 0; j < unionField.Members.length; ++j) {
          similarities.push(
            this.Members[i].Compare(unionField.Members[j])
          );
        }
      }
    } else {
      this.Members.forEach((member) => {
        similarities.push(member.Compare(tsField));
      });
    }
    return similarities.length > 0 ?
      Math.max(...similarities) :
      0;
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

  public Merge(tsField: TsField): TsField {
    let mergeDst = new TsUnion(
      this.Name,
      this.Members.slice(),
    );
    if (tsField.Type === EType.Union) {
      const unionField = tsField as TsUnion;
      unionField.Members.forEach((member) => {
        mergeDst = mergeDst.Merge(member) as TsUnion;
      });
    } else {
      let maxIndex = -1, maxValue = -1;
      mergeDst.Members.forEach((member, index) => {
        const similarity = member.Compare(tsField);
        if (similarity > maxValue) {
          maxValue = similarity;
          maxIndex = index;
        }
      });
      if (maxValue >= 0.2) {
        mergeDst.Members.splice(
          maxIndex,
          1,
          mergeDst.Members[maxIndex].Merge(tsField),
        );
      } else {
        mergeDst.Members.push(tsField);
      }
    }
    return mergeDst.Optimization();
  }

  private getMostSimilarPair(tsFields: TsField[]) {
    let optList: [number, number, number][] = [];
    for (let i = 0; i < tsFields.length - 1; ++i) {
      for (let j = 1; j < tsFields.length; ++j) {
        optList.push([
          tsFields[i].Compare(tsFields[j]), i, j,
        ]);
      }
    }
    if (optList.length > 0) {
      optList.sort((a, b) => a[0] - b[0]);
      return optList[0];
    }
    return null;
  }

  public Optimization() {
    const newMembers = this.Members.slice();
    // 优化到极致
    while (true) {
      const pair = this.getMostSimilarPair(newMembers);
      if (!pair || pair[0] < 0.2) {
        break;
      }
      const index1 = pair[1], index2 = pair[2];
      const field1 = newMembers[index1], field2 = newMembers[index2];
      newMembers[index1] = field1.Merge(field2);
      newMembers.splice(index2, 1);
    }
    return new TsUnion(this.Name, newMembers);
  }
}
