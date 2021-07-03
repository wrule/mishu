
import { ObjectField } from '../proto/object';
import { EType } from '../type';
import { TsField } from './tsField';

export class TsObject extends ObjectField implements TsField {
  constructor(
    name: string,
    fieldsMap: Map<string, TsField>,
  ) {
    super(name, fieldsMap);
  }

  public get FieldsMap() {
    return this.fieldsMap as Map<string, TsField>;
  }

  public get Fields() {
    return Array.from(this.FieldsMap.values());
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
