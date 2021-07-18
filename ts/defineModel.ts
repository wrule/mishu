
export class DefineModel {
  constructor(
    private name: string,
    private define: string = '',
  ) { }

  public get Name() {
    return this.name;
  }

  public get ModuleName() {
    return this.Name;
  }

  public get InterfaceName() {
    return this.Name;
  }

  public get Define() {
    return this.define;
  }
}
