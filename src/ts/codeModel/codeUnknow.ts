import { CodeModel } from './codeModel';
import { TsUnknow } from '../tsUnknow';

export class CodeUnknow extends CodeModel {
  constructor(
    tsField: TsUnknow,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'any';
  }

  public get DefineCode() {
    return '';
  }
}
