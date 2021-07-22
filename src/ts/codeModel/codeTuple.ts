import { CodeModel } from './codeModel';
import { TsTuple } from '../tsTuple';

export class CodeTuple extends CodeModel {
  constructor(
    tsField: TsTuple,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsTuple {
    return this.tsField as TsTuple;
  }

  public SelfCodeModels(): CodeModel[] {
    const result: CodeModel[] = [];
    this.TsField.Elements.forEach((element) => {
      result.push(
        ...element.ToCodeModel(this).SelfCodeModels()
      );
    });
    return result;
  }

  public get ModuleName() {
    const name = this.Name.trim() || 'any';
    const first = name.substr(0, 1).toUpperCase();
    return `${first}${name.substr(1)}`;
  }

  public get InterfaceName() {
    return `[${
      this.TsField.Elements
        .map((element) => element.ToCodeModel(this.parent).InterfaceNameInContext)
        .join(', ')
    }]`;
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
