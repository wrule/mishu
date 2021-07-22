import { EType } from '../../type';
import { TsField } from '../tsField';
import { CodeObject } from './codeObject';

export abstract class CodeModel {
  constructor(
    protected tsField: TsField,
    protected parent?: CodeModel,
  ) { }

  public get Name() {
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
