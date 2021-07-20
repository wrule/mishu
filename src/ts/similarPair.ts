import { TsField } from './tsField';

export class SimilarPair {
  constructor(
    private srcIndex: number,
    private dstIndex: number,
    tsFieldsMap: Map<number, TsField>,
  ) {
    this.ReCompare(tsFieldsMap);
  }

  private similarity = 0;

  /**
   * 源索引
   */
  public get SrcIndex() {
    return this.srcIndex;
  }

  /**
   * 目标索引
   */
  public get DstIndex() {
    return this.dstIndex;
  }

  /**
   * 两者相似度
   */
  public get Similarity() {
    return this.similarity;
  }

  /**
   * 可以合并
   */
  public get CanBeMerged() {
    return this.Similarity >= 0.2;
  }

  public IsRelevant(index: number) {
    return (
      this.srcIndex === index ||
      this.dstIndex === index
    );
  }

  public ReCompare(tsFieldsMap: Map<number, TsField>) {
    const srcTsField = tsFieldsMap.get(this.SrcIndex);
    if (!srcTsField) {
      throw new Error('索引不到源字段');
    }
    const dstTsField = tsFieldsMap.get(this.DstIndex);
    if (!dstTsField) {
      throw new Error('索引不到目标字段');
    }
    this.similarity = srcTsField.Compare(dstTsField);
  }
}
