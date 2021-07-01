import { EType } from './type';

export interface IField {
  /**
   * 结构名称
   */
  Name: string;
  /**
   * 结构类型
   */
  Type: EType,
  /**
   * 结构的Hash
   */
  Hash(): string;
  /**
   * 判断此结构与传入结构是否相等
   */
  Equal(field: IField): boolean;
  /**
   * 比较此结构与传入结构的差异
   * 返回一个[0 ~ 1]的值，代表相似度
   */
  Compare(field: IField): number;
  /**
   * 判断此结构是否包含传入结构
   */
  Contain(field: IField): boolean;
  /**
   * 将此结构与传入结构合并生成一个新的结构
   */
  Merge(field: IField): IField;
  /**
   * 将此结构与传入结构对比，返回差异树
   */
  Diff(field: IField): any[];
}
