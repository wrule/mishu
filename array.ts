import { IField } from './field';
import { TupleField } from './tuple';
import { EType } from './type';
import { StringHash } from './utils';

// TODO
export class ArrayField implements IField {
  public constructor(
    name: string,
    element: IField,
  ) {
    this.Name = name;
    this.Type = EType.Array;
    this.element = element;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private element: IField;

  public get Element() {
    return this.element;
  }

  public Hash() {
    return StringHash(`${this.element.Hash()}[]`);
  }

  public Equal(field: IField): boolean {
    return this.Hash() === field.Hash();
  }

  public Compare(field: IField): number {
    if (field.Type === EType.Array) {
      const arrayField = field as ArrayField;
      return this.Element.Compare(arrayField.Element) * 0.9 + 0.1;
    } else {
      return 0;
    }
  }

  public Contain(field: IField): boolean {
    if (field.Type === EType.Array) {
      const arrayField = field as ArrayField;
      return this.Element.Contain(arrayField.Element);
    } else if (field.Type === EType.Tuple) {
      const tupleField = field as TupleField;
      return tupleField.Elements.every(
        (element) => this.Element.Contain(element)
      );
    } else {
      return false;
    }
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Array) {
      const arrayField = field as ArrayField;
      return new ArrayField(
        this.Name,
        this.Element.Merge(arrayField.Element),
      );
    } else {
      return field.Merge(this);
    }
  }

  public Diff(field: IField): any[] {
    return [];
  }
}