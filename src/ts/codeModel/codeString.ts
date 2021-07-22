import { CodeModel } from './codeModel';
import { TsString } from '../tsString';

export class CodeString extends CodeModel {
  constructor(
    tsField: TsString,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsString {
    return this.tsField;
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'string';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
