import { CodeModel } from './codeModel';
import { TsArray } from '../tsArray';

export class CodeArray extends CodeModel {
  constructor(
    tsField: TsArray,
    parent?: CodeModel,
  ) {
    super(tsField, parent);
  }

  public get TsField(): TsArray {
    return this.tsField as TsArray;
  }

  public SelfCodeModels(): CodeModel[] {
    return [
      ...this.TsField.Element.ToCodeModel(this).SelfCodeModels()
    ];
  }

  public get InterfaceName() {
    return `${this.TsField.Element.ToCodeModel(this.parent).InterfaceNameInContext}[]`;
  }

  public get InterfaceNameInContext() {
    return this.InterfaceName;
  }

  public get DefineCode() {
    return '';
  }
}
