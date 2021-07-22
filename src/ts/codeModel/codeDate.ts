import { CodeModel } from './codeModel';
import { TsDate } from '../tsDate';

export class CodeDate extends CodeModel {
  constructor(
    tsField: TsDate,
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
    return 'Date';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
