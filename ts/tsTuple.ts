import { JsField } from '../js/jsField';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsTuple extends TsField {
  constructor(
    name: string,
    private elements: TsField[],
  ) {
    super(name, EType.Tuple);
  }

  public get Elements() {
    return this.elements;
  }

  private static hash = StringHash(EType.Tuple);

  public Hash() {
    return TsTuple.hash;
  }

  public Update(jsField: JsField) {
    return { } as any;
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
