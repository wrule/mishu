import { IField } from './field';
import { EType } from './type';
import { UndefinedField } from './undefined';
import { StringHash } from './utils/stringHash';

export class ObjectField implements IField {
  public constructor(
    name: string,
    fields: IField[],
  ) {
    this.Name = name;
    this.Type = EType.Object;
    this.fields = fields;
    this.fieldsMap = new Map<string, IField>(
      this.fields.map((field) => [field.Name, field])
    );
  }

  public readonly Name: string;

  public readonly Type: EType;

  private fields: IField[];

  public get Fields() {
    return this.fields;
  }

  private fieldsMap: Map<string, IField>;

  public get FieldsMap() {
    return this.fieldsMap;
  }

  public Hash() {
    const fields = this.fields.slice(0);
    fields.sort((a, b) => a.Name.localeCompare(b.Name));
    return StringHash(
      fields
        .map((field) => `${field.Name}:${field.Hash()}`)
        .join(';')
    );
  }

  public Equal(field: IField): boolean {
    return this.Hash() === field.Hash();
  }

  public Compare(field: IField): number {
    if (field.Type === EType.Object) {
      const objectField = field as ObjectField;
      const maxLength = this.Fields.length > objectField.Fields.length ?
        this.Fields.length :
        objectField.Fields.length;
      const cmpFields = this.Fields.filter(
        (field) => objectField.FieldsMap.has(field.Name)
      );
      const passRate = cmpFields.length / maxLength;
      let sum = 0;
      cmpFields.forEach((field) => {
        sum += field.Compare(
          objectField.FieldsMap.get(field.Name) as IField
        ) * 0.6 + 0.4;
      });
      return (sum / cmpFields.length) * passRate;
    } else {
      return 0;
    }
  }

  public Contain(field: IField): boolean {
    if (field.Type === EType.Object) {
      const objectField = field as ObjectField;
      return objectField.Fields.every((field) => (
        this.fieldsMap.has(field.Name) &&
        this.fieldsMap.get(field.Name)?.Contain(field)
      ));
    } else {
      return false;
    }
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Object) {
      const objectField = field as ObjectField;
      const similarity = this.Compare(objectField);
      if (similarity > 0.2) {
        const allFieldNames = this.Fields.map((field) => field.Name)
          .concat(objectField.Fields.map((field) => field.Name));
        const newFields = allFieldNames.map((name) => {
          const field1 = this.FieldsMap.get(name) || new UndefinedField(name);
          const field2 = objectField.FieldsMap.get(name) || new UndefinedField(name);
          return field1.Merge(field2);
        });
        return new ObjectField(this.Name, newFields);
      } else {
        return { } as any;
      }
    } else {
      return field.Merge(this);
    }
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
