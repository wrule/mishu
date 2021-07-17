import { Field } from '../proto/field';
import { EType } from '../type';

export abstract class TsField extends Field {
  public Compare(tsField: TsField): number {
    if (tsField.Hash() === this.Hash()) {
      return 1;
    }
    if (
      tsField.Type === EType.Union &&
      this.Type !== EType.Union
    ) {
      return tsField.iCompare(this);
    }
    return this.iCompare(tsField);
  }

  abstract iCompare(tsField: TsField): number;

  abstract Merge(tsField: TsField): TsField;
}
