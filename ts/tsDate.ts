import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsDate extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Date);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
