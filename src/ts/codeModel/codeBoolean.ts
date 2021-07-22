import { CodeModel } from './codeModel';
import { TsBoolean } from '../tsBoolean';

export class CodeBoolean extends CodeModel {
  constructor(
    tsField: TsBoolean,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsBoolean {
    return this.tsField;
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'boolean';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
