import { CodeModel } from './codeModel';
import { TsBoolean } from '../tsBoolean';

export class CodeBoolean extends CodeModel {
  constructor(
    tsField: TsBoolean,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public ModuleCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'boolean';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
