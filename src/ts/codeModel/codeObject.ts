import { CodeModel } from './codeModel';
import { TsObject } from '../tsObject';

export class CodeObject extends CodeModel {
  constructor(
    tsField: TsObject,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsObject {
    return this.tsField as TsObject;
  }

  public SelfCodeModels(): CodeModel[] {
    return [this];
  }

  /**
   * 覆盖实现模块内的CodeModel列表
   * @returns CodeModel列表
   */
  public ModuleCodeModels(): CodeModel[] {
    const result: CodeModel[] = [];
    this.TsField.Fields.forEach((field) => {
      result.push(...field.ToCodeModel(this).SelfCodeModels());
    });
    return result;
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

  public get InterfaceNameInContext() {
    const objectCodeModel = this.ParentObjectCodeModel();
    if (objectCodeModel) {
      return `${objectCodeModel.ModuleName}.${this.InterfaceName}`;
    }
    return this.InterfaceName;
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
  public get InterfaceDefineCode(): string {
    return `
//#region ${this.InterfaceName}接口定义
export interface ${this.InterfaceName} {
${
  this.TsField.Fields
    .map(
      (field) =>
        `  ['${field.Name}']: ${field.ToCodeModel(this).InterfaceNameInContext};`
    )
    .concat(['  [propName: string]: any;'])
    .join('\n')
}
}
//#endregion 
    `.trim();
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
      // TODO 这里正确的，但是没有仔细论证
      .map((line) => line.trim() ? line : '')
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
