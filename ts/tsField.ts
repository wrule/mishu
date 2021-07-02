import { EType } from '../type';
import { StringHash } from '../utils';

export abstract class TsField {
  constructor(
    name: string,
    type: EType,
  ) {
    this.Name = name;
    this.Type = type;
  }

  public Hash() {
    return StringHash(this.Type);
  }

  public Equal(field: TsField): boolean {
    return field.Type === this.Type;
  }

  public Compare(field: TsField): number {
    return field.Type === this.Type ? 1 : 0;
  }

  public Contain(field: TsField): boolean {
    return field.Type === this.Type;
  }

  public readonly Name: string;
  public readonly Type: EType;
}
