import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsNumber extends TsField {
  constructor(name: string) {
    super(name, EType.Number);
  }

  private static hash = StringHash(EType.Number);

  public Hash() {
    return TsNumber.hash;
  }
}
