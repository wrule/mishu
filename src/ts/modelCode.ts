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
    return this.name.trim() || 'any';
  }

  /**
   * 类型定义代码
   */
  public get Define() {
    return this.define;
  }

  /**
   * 模块名称
   */
  public get ModuleName() {
    const first = this.Name.substr(0, 1).toUpperCase();
    return `${first}${this.Name.substr(1)}`;
  }

  /**
   * 接口名称
   */
  public get InterfaceName() {
    return `I${this.ModuleName}`;
  }
}
