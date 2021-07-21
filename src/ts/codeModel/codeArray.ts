import { CodeModel } from './codeModel';
import { TsArray } from '../tsArray';

export class CodeArray extends CodeModel {
  constructor(
    tsField: TsArray,
  ) {
    super(tsField);
  }

  public get TsField(): TsArray {
    return this.tsField as TsArray;
  }

  public get ModuleName() {
    const name = this.Name.trim() || 'any';
    const first = name.substr(0, 1).toUpperCase();
    return `${first}${name.substr(1)}`;
  }

  public get InterfaceName() {
    return `${this.TsField.Element.ToCodeModel().InterfaceName}[]`;
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