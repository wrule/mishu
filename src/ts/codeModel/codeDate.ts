import { CodeModel } from './codeModel';
import { TsDate } from '../tsDate';

export class CodeDate extends CodeModel {
  constructor(
    tsField: TsDate,
  ) {
    super(tsField);
  }

  public get InterfaceName() {
    return 'Date';
  }

  public get DefineCode() {
    return '';
  }
}
