import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsBoolean extends TsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }

  private static hash = StringHash(EType.Boolean);

  public Hash() {
    return TsBoolean.hash;
  }
}
