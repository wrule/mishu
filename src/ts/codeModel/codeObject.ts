import { CodeModel } from './codeModel';
import { TsObject } from '../tsObject';
import { TsField } from '../tsField';

export class CodeObject extends CodeModel {
  constructor(
    tsField: TsObject,
  ) {
    super(tsField);
  }

  public get TsField(): TsObject {
    return this.tsField as TsObject;
  }

  /**
   * 模块名称
   */
  public get ModuleName() {
    const name = this.Name.trim() || 'something';
    const first = name.substr(0, 1).toUpperCase();
    return `${first}${name.substr(1)}`;
  }

  /**
   * 接口名称
   */
  public get InterfaceName() {
    return `I${this.ModuleName}`;
  }

  public get DefineCode() {
    let result = this.InterfaceDefineCode;
    const moduleCode = this.ModuleDefineCode;
    if (moduleCode.trim()) {
      result += `\n\n${moduleCode}`;
    }
    return result;
  }

  /**
   * 接口定义部分代码
   */
  public get InterfaceDefineCode() {
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

  /**
   * 模块内的CodeModel列表
   * @returns CodeModel列表
   */
  public ModuleCodeModels(): CodeModel[] {
    const tsFields: TsField[] = [];
    this.TsField.Fields.forEach((field) => {
      tsFields.push(...field.DomainTsFields());
    });
    return tsFields.map((tsField) => tsField.ToCodeModel());
  }

  /**
   * 模块定义部分代码
   */
  public get ModuleDefineCode() {
    const moduleCodeModels = this.ModuleCodeModels();
    if (moduleCodeModels.length < 1) {
      return '';
    }
    const defineCode = moduleCodeModels
      .map((codeModel) => codeModel.DefineCode)
      .join('\n\n')
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');
    return `
//#region ${this.ModuleName}模块定义，此模块包含${this.InterfaceName}接口下所有子级接口定义
export module ${this.ModuleName} {
${defineCode}
}
//#endregion
    `.trim();
  }

  public get ExampleCode() {
    return `// let ${this.Name}: ${this.InterfaceName} = { } as any;`;
  }
}
