import { IField } from './field';
import { EType } from './type';
import { UnionField } from './union';
import { StringHash } from './utils/stringHash';

export class DateField implements IField {
  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Date;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private static hash = StringHash(EType.Date);

  public Hash() {
    return DateField.hash;
  }

  public Equal(field: IField): boolean {
    return field.Type === EType.Date;
  }

  public Compare(field: IField): number {
    return field.Type === EType.Date ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return field.Type === EType.Date;
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Date) {
      return new DateField(this.Name);
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
