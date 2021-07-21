import { CodeModel } from './codeModel';
import { TsString } from '../tsString';

export class CodeString extends CodeModel {
  constructor(
    tsField: TsString,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'string';
  }

  public get DefineCode() {
    return '';
  }
}
