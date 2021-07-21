import { TsField } from '../tsField';

export abstract class CodeModel {
  constructor(
    protected tsField: TsField,
    protected parent?: CodeModel,
  ) { }

  public get Name() {
    return this.tsField.Name;
  }

  public get Parent() {
    return this.parent;
  }

  abstract InterfaceName: string;

  abstract DefineCode: string;
}
