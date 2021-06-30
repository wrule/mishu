import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils';

export class TupleField implements IField {
  public constructor(
    name: string,
    elements: IField[],
  ) {
    this.Name = name;
    this.Type = EType.Tuple;
    this.elements = elements;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private elements: IField[];

  public get Elements() {
    return this.elements;
  }

  public Hash() {
    return StringHash(
      this.Elements
        .map((element) => element.Hash())
        .join(',')
    );
  }

  public Equal(field: IField): boolean {
    return this.Hash() === field.Hash();
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
