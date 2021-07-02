import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsUnknow extends TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  private static hash = StringHash(EType.Unknow);

  public Hash() {
    return TsUnknow.hash;
  }
}
