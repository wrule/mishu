import { IField } from './field';
import { EType } from './type';
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
    return this.Type === field.Type ? 1 : 0;
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
    return { } as any;
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
