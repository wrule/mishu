import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsNull extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Null);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
