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

  public Hash() {
    return StringHash(this.Type);
  }

  public Equal(field: IField): boolean {
    return field.Type === EType.Unknow;
  }

  public Compare(field: IField): number {
    return field.Type === EType.Unknow ? 1 : 0;
  }

  public Contain(field: IField): boolean {
    return true;
  }

  public Merge(field: IField): IField {
    if (field.Type === EType.Unknow) {
      return this;
    } else {
      return field;
    }
  }

  public Diff(field: IField): any[] {
    return [];
  }
}
