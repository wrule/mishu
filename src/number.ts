import { IStruct } from './struct';
import { EType } from './type';

export class Number implements IStruct {
  public readonly Name: string;

  public readonly Type: EType;

  public readonly Hash: string = '';

  public Equal(struct: IStruct): boolean {
    return this.Type === struct.Type;
  }

  public Compare(struct: IStruct): number {
    return this.Type === struct.Type ? 1 : 0;
  }

  public Contain(struct: IStruct): boolean {
    return this.Type === struct.Type;
  }

  public Merge(struct: IStruct): IStruct {
    return { } as any;
  }

  public Diff(struct: IStruct): any[] {
    return [];
  }

  public constructor(
    name: string,
  ) {
    this.Name = name;
    this.Type = EType.Number;
  }
}
