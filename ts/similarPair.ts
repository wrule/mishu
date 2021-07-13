
export class SimilarPair {
  constructor(
    private srcIndex: number,
    private dstIndex: number,
    private similarity: number,
  ) { }

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
   * 判断是否是同一对
   * @param pair 另一对
   * @returns 布尔值
   */
  public IsSamePair(pair: SimilarPair) {
    return (
      (this.srcIndex === pair.SrcIndex && this.dstIndex === pair.DstIndex) ||
      (this.srcIndex === pair.DstIndex && this.dstIndex === pair.SrcIndex)
    );
  }

  /**
   * 判断是否和本对关联
   * @param pair 另一对
   * @returns 布尔值
   */
  public IsRelevant(pair: SimilarPair) {
    return (
      this.srcIndex === pair.SrcIndex ||
      this.srcIndex === pair.DstIndex ||
      this.dstIndex === pair.SrcIndex ||
      this.dstIndex === pair.DstIndex
    );
  }

  /**
   * 判断对是否相等
   * @param pair 另一对
   * @returns 布尔值
   */
  public Equal(pair: SimilarPair) {
    return (
      this.IsSamePair(pair) &&
      this.similarity === pair.Similarity
    );
  }
}
