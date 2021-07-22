import { EType } from '../../type';
import { UpperFirst } from '../../utils';
import { TsField } from '../tsField';
import { CodeObject } from './codeObject';

export abstract class CodeModel {
  constructor(
    protected tsField: TsField,
    protected parent?: CodeModel,
  ) { }

  public get Type() {
    return this.tsField.Type;
  }

  protected upperFirstName(
    name: string,
    defaultName: string = 'Something',
  ) {
    return UpperFirst(name).trim() || defaultName;
  }

  public get Name(): string {
    if (this.parent) {
      if (
        this.parent.Type === EType.Array ||
        this.parent.Type === EType.Tuple ||
        this.parent.Type === EType.Union
      ) {
        return `${
          this.parent.Name
        }${
          this.upperFirstName(this.tsField.Name)
        }`;
      }
    }
    return this.tsField.Name;
  }

  public get Parent() {
    return this.parent;
  }

  public ParentObjectCodeModel(): CodeObject | undefined {
    let result = this.parent;
    while (result && result.TsField.Type !== EType.Object) {
      result = result.parent;
    }
    return result as CodeObject | undefined;
  }

  public ModuleCodeModels(): CodeModel[] {
    return this.SelfCodeModels();
  }

  abstract SelfCodeModels(): CodeModel[];

  abstract TsField: TsField;

  abstract InterfaceName: string;

  abstract InterfaceNameInContext: string;

  abstract DefineCode: string;
}
