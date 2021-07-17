/**
 * 多结构合并器
 */
import { TsField } from './tsField';
import { SimilarPair } from './similarPair';
import { TsUnion } from './tsUnion';
import { TsUnknow } from './tsUnknow';

export class TsMerger {
  private static merge(tsFields: TsField[]) {
    const unionMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );
    const tupleIndexs = tsFields.map((tsField, index) => index);
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
        similarPairs[0].CanBeMerged
      ) {
        // 尝试最优合并
        const bestSimilarPair = similarPairs[0];
        const srcField = unionMap.get(bestSimilarPair.SrcIndex) as TsField;
        const dstField = unionMap.get(bestSimilarPair.DstIndex) as TsField;
        const mergedField = srcField.Merge(dstField);
        // 优化unionMap中的类型
        unionMap.set(bestSimilarPair.SrcIndex, mergedField);
        unionMap.delete(bestSimilarPair.DstIndex);
        // 清理dstField的关系
        similarPairs = similarPairs
          .filter((pair) => !pair.IsRelevant(bestSimilarPair.DstIndex));
        // 重新计算srcField的关系
        similarPairs
          .filter((pair) => pair.IsRelevant(bestSimilarPair.SrcIndex))
          .forEach((pair) => pair.ReCompare(unionMap));
        // 重新索引tupleIndexs
        tupleIndexs.forEach((num, index) => {
          if (num === bestSimilarPair.DstIndex) {
            tupleIndexs[index] = bestSimilarPair.SrcIndex;
          }
        });
      } else {
        break;
      }
    }
    return {
      tupleIndexs,
      unionMap,
    };
  }
}
