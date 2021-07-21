import { CodeModel } from './codeModel';
import { TsUnknow } from '../tsUnknow';

export class CodeUnknow extends CodeModel {
  constructor(
    tsField: TsUnknow,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get InterfaceName() {
    return 'any';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
