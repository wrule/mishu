import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsNumber extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Number);
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
