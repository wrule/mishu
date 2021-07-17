import { Field } from '../proto/field';
import { EType } from '../type';

export interface TsField extends Field {
  Contain(tsField: TsField): boolean;

  Compare(tsField: TsField): number;

  Merge(tsField: TsField): TsField;
}
