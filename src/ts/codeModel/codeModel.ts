import { TsField } from '../tsField';

export abstract class CodeModel {
  constructor(
    private tsField: TsField,
  ) { }

  abstract InterfaceName: string;

  abstract DefineCode: string;
}
