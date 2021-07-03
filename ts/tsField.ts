import { JsField } from '../js/jsField';
import { EType } from '../type';

export abstract class TsField {
  constructor(
    name: string,
    type: EType,
  ) {
    this.Name = name;
    this.Type = type;
  }

  public abstract Hash(): string;

  public Equal(field: TsField): boolean {
    return field.Type === this.Type;
  }

  public Compare(field: TsField): number {
    return field.Type === this.Type ? 1 : 0;
  }

  public Contain(field: TsField): boolean {
    return field.Type === this.Type;
  }

  public abstract Update(jsField: JsField): TsField;

  public abstract Merge(tsField: TsField): TsField;

  public readonly Name: string;
  public readonly Type: EType;
}
