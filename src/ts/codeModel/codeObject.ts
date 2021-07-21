import { CodeModel } from './codeModel';
import { TsObject } from '../tsObject';

export class CodeObject extends CodeModel {
  constructor(
    tsField: TsObject,
  ) {
    super(tsField);
  }

  public get TsField(): TsObject {
    return this.tsField as TsObject;
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
    let result = this.DefineInterfaceCode;
    const moduleCode = this.DefineModuleCode;
    if (moduleCode) {
      result += `\n\n${moduleCode}`;
    }
    return result;
  }

  public get DefineModuleCode() {
    return `
//#region ${this.ModuleName}模块定义，此模块包含${this.InterfaceName}接口下所有子级接口定义
//#endregion
    `.trim();
  }

  public get DefineInterfaceCode() {
    return `
//#region ${this.InterfaceName}接口定义
export interface ${this.InterfaceName} {
${
  this.TsField.Fields
    .map(
      (field) =>
        `  ${field.Name}: ${field.ToCodeModel().InterfaceName};`
    )
    .join('\n')
}
}
//#endregion 
    `.trim();
  }
}
