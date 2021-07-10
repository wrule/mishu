import { EType } from "../type";
import { StringHash } from "../utils";

export abstract class Field {
  constructor(
    private name: string,
    private type: EType,
  ) { }

  public get Name() {
    return this.name;
  }

  public get Type() {
    return this.type;
  }

  private static hashs = new Map<EType, string>([
    [EType.Undefined, StringHash(EType.Undefined)],
    [EType.Null, StringHash(EType.Null)],
    [EType.Boolean, StringHash(EType.Boolean)],
    [EType.Number, StringHash(EType.Number)],
    [EType.String, StringHash(EType.String)],
    [EType.Date, StringHash(EType.Date)],
    [EType.Unknow, StringHash(EType.Unknow)],
  ]);

  public Hash() {
    const result = Field.hashs.get(this.Type);
    if (!result) {
      throw new Error('非基本类型的Hash函数未实现');
    }
    return result;
  }

  public Equal(field: Field): boolean {
    return field.Hash() === this.Hash();
  }

  public Compare(field: Field): number {
    if (field.Type === EType.Union) {
      return field.Compare(this);
    }
    return this.Equal(field) ? 1 : 0;
  }

  public Contain(field: Field): boolean {
    return this.Equal(field);
  }
}
