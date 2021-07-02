import { EType } from '../type';
import { JsField } from './jsField';

export class JsObject extends JsField {
  public get FieldsMap() {
    return this.fieldsMap;
  }

  public get Fields() {
    return Array.from(this.fieldsMap.values());
  }

  constructor(
    name: string,
    private fieldsMap: Map<string, JsField>,
  ) {
    super(name, EType.Object);
  }
}
