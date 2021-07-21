import { CodeModel } from './codeModel';
import { TsNumber } from '../tsNumber';

export class CodeNumber extends CodeModel {
  constructor(
    tsField: TsNumber,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'number';
  }

  public get DefineCode() {
    return '';
  }
}
