import { TsField } from '../tsField';

export abstract class CodeModel {
  constructor(
    protected tsField: TsField,
  ) { }

  public get Name() {
    return this.tsField.Name;
  }

  abstract InterfaceName: string;

  abstract DefineCode: string;
}
