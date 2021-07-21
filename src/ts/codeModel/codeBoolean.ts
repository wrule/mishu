import { CodeModel } from './codeModel';
import { TsBoolean } from '../tsBoolean';

export class CodeBoolean extends CodeModel {
  constructor(
    tsField: TsBoolean,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'boolean';
  }

  public get DefineCode() {
    return '';
  }
}
