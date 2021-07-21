import { CodeModel } from './codeModel';
import { TsNumber } from '../tsNumber';

export class CodeNumber extends CodeModel {
  constructor(
    tsField: TsNumber,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get InterfaceName() {
    return 'number';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
