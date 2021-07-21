import { CodeModel } from './codeModel';
import { TsUnion } from '../tsUnion';

export class CodeUnion extends CodeModel {
  constructor(
    tsField: TsUnion,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsUnion {
    return this.tsField as TsUnion;
  }

  public get ModuleName() {
    const name = this.Name.trim() || 'any';
    const first = name.substr(0, 1).toUpperCase();
    return `${first}${name.substr(1)}`;
  }

  public get InterfaceName() {
    return `(${
      this.TsField.Members
        .map((member) => member.ToCodeModel(this.parent).InterfaceNameInContext)
        .join(' | ')
    })`;
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return `
//#region ${this.InterfaceName}
export interface ${this.InterfaceName} {
}
//#endregion 
    `.trim();
  }
}
