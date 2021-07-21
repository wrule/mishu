import { CodeModel } from './codeModel';
import { TsBoolean } from '../tsBoolean';

export class CodeBoolean extends CodeModel {
  constructor(
    tsField: TsBoolean,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get InterfaceName() {
    return 'boolean';
  }

  public get DefineCode() {
    return '';
  }
}
