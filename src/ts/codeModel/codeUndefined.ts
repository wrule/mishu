import { CodeModel } from './codeModel';
import { TsUndefined } from '../tsUndefined';

export class CodeUndefined extends CodeModel {
  constructor(
    tsField: TsUndefined,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'undefined';
  }

  public get DefineCode() {
    return '';
  }
}
