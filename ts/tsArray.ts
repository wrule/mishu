import { JsField } from '../js/jsField';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsArray extends TsField {
  constructor(
    name: string,
    private element: TsField,
  ) {
    super(name, EType.Array);
  }

  public get Element() {
    return this.element;
  }

  private static hash = StringHash(EType.Array);

  public Hash() {
    return TsArray.hash;
  }

  public Update(jsField: JsField) {
    return { } as any;
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
