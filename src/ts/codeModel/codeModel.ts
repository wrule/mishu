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

  abstract SelfCodeModels(): CodeModel[];

  public ModuleCodeModels(): CodeModel[] {
    return this.SelfCodeModels();
  }

  abstract InterfaceName: string;

  abstract InterfaceNameInContext: string;

  abstract DefineCode: string;
}
