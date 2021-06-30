import { IField } from './field';
import { EType } from './type';
import { UnionField } from './union';
import { StringHash } from './utils';

export class NumberField implements IField {
  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Number;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private static hash = StringHash(EType.Number);

  public Hash() {
    return NumberField.hash;
  }

  public Equal(field: IField): boolean {
    return field.Type === EType.Number;
  }

  public Compare(field: IField): number {
    return field.Type === EType.Number ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return field.Type === EType.Number;
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Number) {
      return new NumberField(this.Name);
    } else if (field.Type === EType.Union) {
      return field.Merge(this);
    } else if (field.Type === EType.Unknow) {
      return field.Merge(this);
    } else {
      return new UnionField(this.Name, [this, field]);
    }
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
