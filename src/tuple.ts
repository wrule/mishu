import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils/stringHash';

export class TupleField implements IField {
  public readonly Name: string;

  public readonly Type: EType;

  private elements: IField[];

  public Hash() {
    return StringHash(
      this.elements
        .map((element) => element.Hash())
        .join(',')
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
    elements: IField[],
  ) {
    this.Name = name;
    this.Type = EType.Tuple;
    this.elements = elements;
  }
}
