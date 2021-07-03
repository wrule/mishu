import { ObjectField } from '../proto/object';
import { JsField } from './jsField';

export class JsObject extends ObjectField implements JsField {
  constructor(
    name: string,
    fieldsMap: Map<string, JsField>,
  ) {
    super(name, fieldsMap);
  }

  public get FieldsMap() {
    return this.fieldsMap as Map<string, JsField>;
  }

  public get Fields() {
    return Array.from(this.FieldsMap.values());
  }

  public ToTs() {

  }
}
