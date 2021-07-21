import { CodeModel } from './codeModel';
import { TsObject } from '../tsObject';

export class CodeObject extends CodeModel {
  constructor(
    tsField: TsObject,
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
