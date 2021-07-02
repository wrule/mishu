import { JsField } from '../js/jsField';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsUnion extends TsField {
  constructor(
    name: string,
    private members: TsField[],
  ) {
    super(name, EType.Union);
  }

  public get Members() {
    return this.members;
  }

  private static hash = StringHash(EType.Union);

  public Hash() {
    return TsUnion.hash;
  }

  public Update(jsField: JsField): TsField {
    return { } as any;
  }
}
