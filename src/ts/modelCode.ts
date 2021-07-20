/**
 * TypeScript定义代码模型
 */
export class ModelCode {
  constructor(
    private name: string,
    private define: string = '',
  ) { }

  /**
   * 类型名称
   */
  public get Name() {
    return this.name;
  }

  /**
   * 类型定义代码
   */
  public get Define() {
    return this.define;
  }

  public get ModuleName() {
    return this.Name;
  }

  public get InterfaceName() {
    return this.Name;
  }
}
