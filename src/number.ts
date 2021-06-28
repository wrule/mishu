import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils/stringHash';

export class NumberField implements IField {
  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Number;
  }

  public readonly Name: string;

  public readonly Type: EType;

  public Hash() {
    return StringHash(this.Type);
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
}
