import { CodeModel } from './codeModel';
import { TsDate } from '../tsDate';

export class CodeDate extends CodeModel {
  constructor(
    tsField: TsDate,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsDate {
    return this.tsField;
  }

  public SelfCodeModels(): CodeModel[] {
    return [];
  }

  public get InterfaceName() {
    return 'Date';
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
