import { CodeModel } from './codeModel';
import { TsNull } from '../tsNull';

export class CodeNull extends CodeModel {
  constructor(
    tsField: TsNull,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'null';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
