
import { JsField } from '../js/jsField';
import { UnionField } from '../proto/union';
import { EType } from '../type';
import { CodeModel } from './codeModel/codeModel';
import { CodeUnion } from './codeModel/codeUnion';
import { BeforeCompare, BeforeContain, BeforeDefine, BeforeMerge, BeforeUpdate } from './decorators';
import { IModel } from './model';
import { ModelLoader } from './modelLoader';
import { TsField } from './tsField';
import { TsMerger } from './tsMerger';

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

  public Clone(name?: string): TsField {
    const model = this.ToModel();
    if (name !== undefined) {
      model.name = name;
    }
    return ModelLoader.Load(model);
  }

  @BeforeContain()
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

  @BeforeCompare()
  public Compare(tsField: TsField): number {
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

  @BeforeMerge()
  public Merge(tsField: TsField): TsField {
    const newMembers = this.Members.slice();
    if (tsField.Type === EType.Union) {
      const unionField = tsField as TsUnion;
      newMembers.push(...unionField.Members);
    } else {
      newMembers.push(tsField);
    }
    return TsMerger.Optimize(this.Name, newMembers);
  }

  @BeforeDefine()
  public Define(jsField: JsField) {
    return this.Members.some((member) => member.Define(jsField));
  }

  @BeforeUpdate()
  public Update(jsField: JsField): TsField {
    const tsField = jsField.ToTs();
    return TsMerger.Optimize(this.Name, [...this.Members, tsField]);
  }

  public ToModel(): IModel {
    return {
      type: this.Type,
      name: this.Name,
      members: this.Members.map((member) => member.ToModel()),
    };
  }

  public ToCodeModel(parent?: CodeModel) {
    return new CodeUnion(this, parent);
  }
}
