import { Field } from '../proto/field';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsUnknow extends Field implements TsField {
  constructor(name: string) {
    super(name, EType.Unknow);
  }

  public iCompare(tsField: TsField) {
    return 0;
  }

  public Merge(tsField: TsField): TsField {
    if (tsField.Type === EType.Unknow) {
      return new TsUnknow(this.Name);
    } else {
      return tsField;
    }
  }
}
