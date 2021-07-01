import { IField } from './field';
import { EType } from './type';
import { UnionField } from './union';
import { StringHash } from './utils';

export class NullField implements IField {
  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Null;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private static hash = StringHash(EType.Null);

  public Hash() {
    return NullField.hash;
  }

  public Equal(field: IField): boolean {
    return field.Type === EType.Null;
  }

  public Compare(field: IField): number {
    return field.Type === EType.Null ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return field.Type === EType.Null;
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Null) {
      return new NullField(this.Name);
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