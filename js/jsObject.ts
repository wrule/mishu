import { TsField } from '../ts/tsField';
import { TsObject } from '../ts/tsObject';
import { EType } from '../type';
import { JsField } from './jsField';

export class JsObject extends JsField {
  constructor(
    name: string,
    private fieldsMap: Map<string, JsField>,
  ) {
    super(name, EType.Object);
  }

  public get FieldsMap() {
    return this.fieldsMap;
  }

  public get Fields() {
    return Array.from(this.fieldsMap.values());
  }

  public ToTs() {
    const tsFieldsMap = new Map<string, TsField>(
      Array.from(this.fieldsMap.entries())
        .map(([name, value]) => [name, value.ToTs()])
    );
    return new TsObject(this.Name, tsFieldsMap);
  }
}
