import { CodeModel } from './codeModel';
import { TsString } from '../tsString';

export class CodeString extends CodeModel {
  constructor(
    tsField: TsString,
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
    return 'string';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
