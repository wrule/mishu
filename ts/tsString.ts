import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsString extends TsField {
  constructor(name: string) {
    super(name, EType.String);
  }

  private static hash = StringHash(EType.String);

  public Hash() {
    return TsString.hash;
  }
}
