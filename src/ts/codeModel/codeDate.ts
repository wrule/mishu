import { CodeModel } from './codeModel';
import { TsDate } from '../tsDate';

export class CodeDate extends CodeModel {
  constructor(
    tsField: TsDate,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get InterfaceName() {
    return 'Date';
  }

  public get DefineCode() {
    return '';
  }
}
