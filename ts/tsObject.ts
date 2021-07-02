import { JsField } from '../js/jsField';
import { EType } from '../type';
import { StringHash } from '../utils';
import { TsField } from './tsField';

export class TsObject extends TsField {
  constructor(
    name: string,
    private fieldsMap: Map<string, TsField>,
  ) {
    super(name, EType.Object);
  }

  private static hash = StringHash(EType.Object);

  public Hash() {
    return TsObject.hash;
  }

  public Update(jsField: JsField) {
    return { } as any;
  }
}
