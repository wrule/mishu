import { JsField } from '../js/jsField';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';
import { TsUnion } from './tsUnion';

export class TsBoolean extends TsField {
  constructor(name: string) {
    super(name, EType.Boolean);
  }

  private static hash = StringHash(EType.Boolean);

  public Hash() {
    return TsBoolean.hash;
  }

  public Update(jsField: JsField): TsField {
    if (jsField.Type === this.Type) {
      return new TsBoolean(this.Name);
    } else {
      return new TsUnion(this.Name, [this, jsField.ToTs()]);
    }
  }
}
