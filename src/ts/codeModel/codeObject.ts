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

  public ModuleCodeModels(): CodeModel[] {
    const tsFields: TsField[] = [];
    this.TsField.Fields.forEach((field) => {
      tsFields.push(...field.DomainTsFields());
    });
    return tsFields.map((tsField) => tsField.ToCodeModel());
  }

  public get DefineModuleCode() {
    const moduleCodeModels = this.ModuleCodeModels();
    if (moduleCodeModels.length < 1) {
      return '';
    }
    return `
//#region ${this.ModuleName}模块定义，此模块包含${this.InterfaceName}接口下所有子级接口定义
export module ${this.ModuleName} {
${moduleCodeModels
  .map((codeModel) => codeModel.DefineCode)
  .join('\n\n')}
}
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

  public get ExampleCode() {
    return `let ${this.Name}: ${this.InterfaceName} = { } as any;`;
  }
}
