/**
 * 多结构合并器
 */
import { TsField } from './tsField';
import { SimilarPair } from './similarPair';

export class TsMerger {
  public static Merge(tsFields: TsField[]) {
    const tupleMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );
    const unionMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );

    // 初始化similarPairs
    let similarPairs: SimilarPair[] = [];
    for (let i = 0; i < tsFields.length - 1; ++i) {
      for (let j = 1; j < tsFields.length; ++j) {
        similarPairs.push(new SimilarPair(i, j, unionMap));
      }
    }

    // 迭代优化
    while (true) {
      similarPairs.sort((a, b) => b.Similarity - a.Similarity);
      if (
        similarPairs.length > 0 &&
        similarPairs[0].Similarity >= 0.2
      ) {
        const bestSimilarPair = similarPairs[0];
        const srcField = unionMap.get(bestSimilarPair.SrcIndex) as TsField;
        const dstField = unionMap.get(bestSimilarPair.DstIndex) as TsField;
        const mergedField = srcField.Merge(dstField);
        unionMap.set(bestSimilarPair.SrcIndex, mergedField);
        unionMap.delete(bestSimilarPair.DstIndex);
        // 清理dstField的关系
        similarPairs = similarPairs
          .filter((pair) => !pair.IsRelevant(bestSimilarPair.DstIndex));
        // 重新计算srcField的关系
        similarPairs
          .filter((pair) => pair.IsRelevant(bestSimilarPair.SrcIndex))
          .forEach((pair) => pair.ReCompare(unionMap));
      } else {
        break;
      }
    }
  }
}
