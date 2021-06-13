import { IStruct } from './struct';

export class Boolean implements IStruct {
  public readonly Name: string;

  public Equal(struct: IStruct): boolean {
    return true;
  }

  public Compare(struct: IStruct): number {
    return 0;
  }

  public Contain(struct: IStruct): boolean {
    return false;
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
  }
}
