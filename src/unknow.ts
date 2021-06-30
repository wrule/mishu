import { IField } from './field';
import { EType } from './type';
import { StringHash } from './utils';

export class UnknowField implements IField {
  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Unknow;
  }

  public readonly Name: string;

  public readonly Type: EType;

  private static hash = StringHash(EType.Unknow);

  public Hash() {
    return UnknowField.hash;
  }

  public Equal(field: IField): boolean {
    return false;
  }

  public Compare(field: IField): number {
    return 0;
  }

  public Contain(field: IField): boolean {
    return false;
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Unknow) {
      return new UnknowField(this.Name);
    } else {
      return field;
    }
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
