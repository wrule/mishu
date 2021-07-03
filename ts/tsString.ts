import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsString extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.String);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
