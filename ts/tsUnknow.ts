import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsUnknow extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
