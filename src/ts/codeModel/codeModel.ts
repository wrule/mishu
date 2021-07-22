import { EType } from '../../type';
import { TsField } from '../tsField';

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

  public ParentObjectCodeModel(): CodeModel | undefined {
    let result = this.parent;
    while (result && result.TsField.Type !== EType.Object) {
      result = result.parent;
    }
    return result;
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
