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

  public SelfCodeModels(): CodeModel[] {
    const result: CodeModel[] = [];
    this.TsField.Members.forEach((member) => {
      result.push(
        ...member.ToCodeModel(this).SelfCodeModels()
      );
    });
    return result;
  }

  public ModuleCodeModels(): CodeModel[] {
    return this.TsField.DomainTsFields()
      .map((field) => field.ToCodeModel(this));
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
    return '';
  }
}
