import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsNull extends TsField {
  constructor(name: string) {
    super(name, EType.Null);
  }

  private static hash = StringHash(EType.Null);

  public Hash() {
    return TsNull.hash;
  }
}
