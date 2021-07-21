import { CodeModel } from './codeModel';
import { TsNull } from '../tsNull';

export class CodeNull extends CodeModel {
  constructor(
    tsField: TsNull,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'null';
  }

  public get DefineCode() {
    return '';
  }
}
