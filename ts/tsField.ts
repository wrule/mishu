import { Field } from '../proto/field';

export interface TsField extends Field {
  Merge(tsField: TsField): TsField;
}
