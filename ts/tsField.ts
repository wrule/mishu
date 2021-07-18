import { JsField } from '../js/jsField';
import { Field } from '../proto/field';

export interface TsField extends Field {
  Contain(tsField: TsField): boolean;

  Compare(tsField: TsField): number;

  Merge(tsField: TsField): TsField;

  // Update(jsField: JsField): TsField;

  ToJsonObject(): any;

  // ToCode(): string;
}
