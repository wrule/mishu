import hasha from 'hasha';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsDate extends TsField {
  constructor(name: string) {
    super(name, EType.Date);
  }

  private static hash = StringHash(EType.Date);

  public Hash() {
    return TsDate.hash;
  }
}
