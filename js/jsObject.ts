import { ObjectField } from '../proto/object';
import { TsField } from '../ts/tsField';
import { TsObject } from '../ts/tsObject';
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
    const tsFieldsMap = new Map<string, TsField>(
      this.Fields.map(
        (jsField) => [jsField.Name, jsField.ToTs()]
      )
    );
    return new TsObject(this.Name, tsFieldsMap);
  }
}
