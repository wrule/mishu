import { CodeModel } from './codeModel';
import { TsUnion } from '../tsUnion';

export class CodeUnion extends CodeModel {
  constructor(
    tsField: TsUnion,
  ) {
    super(tsField);
  }

  public get ModuleName() {
    const name = this.Name.trim() || 'any';
    const first = name.substr(0, 1).toUpperCase();
    return `${first}${name.substr(1)}`;
  }

  public get InterfaceName() {
    return `I${this.ModuleName}`;
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
