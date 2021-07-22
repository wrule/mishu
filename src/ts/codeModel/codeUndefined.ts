import { CodeModel } from './codeModel';
import { TsUndefined } from '../tsUndefined';

export class CodeUndefined extends CodeModel {
  constructor(
    tsField: TsUndefined,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'undefined';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
