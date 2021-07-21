import { CodeModel } from './codeModel';
import { TsNull } from '../tsNull';

export class CodeNull extends CodeModel {
  constructor(
    tsField: TsNull,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get InterfaceName() {
    return 'null';
  }

  public get DefineCode() {
    return '';
  }
}
