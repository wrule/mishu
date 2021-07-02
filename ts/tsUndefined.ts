import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsUndefined extends TsField {
  constructor(name: string) {
    super(name, EType.Undefined);
  }

  private static hash = StringHash(EType.Undefined);

  public Hash() {
    return TsUndefined.hash;
  }
}
