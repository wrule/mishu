
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

  public Compare(tsField: TsField): number {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      const maxLength = this.Fields.length > objectField.Fields.length ?
        this.Fields.length :
        objectField.Fields.length;
      const cmpFields = this.Fields.filter(
        (field) => objectField.FieldsMap.has(field.Name)
      );
      const passRate = cmpFields.length / (maxLength || 1);
      let sum = 0;
      cmpFields.forEach((field) => {
        sum += field.Compare(
          objectField.FieldsMap.get(field.Name) as TsField
        ) * 0.6 + 0.4;
      });
      return (sum / (cmpFields.length || 1)) * passRate;
    } else {
      return 0;
    }
  }

  public Contain(tsField: TsField): boolean {
    if (tsField.Type === EType.Object) {
      const objectField = tsField as TsObject;
      return (
        objectField.Fields.length === this.Fields.length &&
        objectField.Fields.every(
          (field) => this.FieldsMap.has(field.Name)
        ) &&
        objectField.Fields.every(
          (field) => (this.FieldsMap.get(field.Name) as TsField).Contain(field)
        )
      );
    } else {
      return false;
    }
  }

  public Merge(tsField: TsField) {
    return { } as any;
  }
}
