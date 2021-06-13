
export interface IStruct {
  /**
   * 结构名称
   */
  Name: string;
  /**
   * 判断此结构与传入结构是否相等
   */
  Equal(struct: IStruct): boolean;
  /**
   * 比较此结构与传入结构的差异
   * 返回一个[0 ~ 1]的值，代表相似度
   */
  Compare(struct: IStruct): number;
  /**
   * 判断此结构是否包含传入结构
   */
  Contain(struct: IStruct): boolean;
  /**
   * 将此结构与传入结构合并生成一个新的结构
   */
  Merge(struct: IStruct): IStruct;
  /**
   * 将此结构与传入结构对比，返回差异树
   */
  Diff(struct: IStruct): any[];
}
