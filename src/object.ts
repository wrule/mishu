import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils/stringHash';

export class ObjectField implements IField {
  public readonly Name: string;

  public readonly Type: EType;

  private fields: IField[];

  public Hash() {
    return StringHash(
      this.fields
        .map((field) => field.Hash())
        .join(';')
    );
  }

  public Equal(field: IField): boolean {
    return this.Type === field.Type;
  }

  public Compare(field: IField): number {
    return this.Type === field.Type ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return this.Type === field.Type;
  }

  public Merge(field: IField): IField {
    return { } as any;
  }

  public Diff(field: IField): any[] {
    return [];
  }

  public constructor(
    name: string,
    fields: IField[],
  ) {
    this.Name = name;
    this.Type = EType.Object;
    this.fields = fields;
  }
}
