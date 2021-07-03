import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsUndefined extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Undefined);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
