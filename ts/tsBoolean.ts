import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsBoolean extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
