import { EType } from '../type';

export abstract class JsField {
  constructor(
    name: string,
    type: EType,
  ) {
    this.Name = name;
    this.Type = type;
  }

  public readonly Name: string;
  public readonly Type: EType;
}
