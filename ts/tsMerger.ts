/**
 * 多结构合并器
 */
import { TsField } from './tsField';

export interface SimilarPair {
  srcIndex: number;
  dstIndex: number;
  similarity: number;
}

export class TsMerger {
  /**
   * 获取一组TsField中规格内最相似的一对
   * @param tsFields 
   * @returns SimilarPair或null
   */
  private static getBestSimilarPair(tsFields: TsField[]) {
    let similarPairs: SimilarPair[] = [];
    for (let i = 0; i < tsFields.length - 1; ++i) {
      for (let j = 1; j < tsFields.length; ++j) {
        similarPairs.push({
          srcIndex: i,
          dstIndex: j,
          similarity: tsFields[i].Compare(tsFields[j]),
        });
      }
    }
    similarPairs.sort((a, b) => b.similarity - a.similarity);
    if (
      similarPairs.length > 0 &&
      similarPairs[0].similarity >= 0.2
    ) {
      return similarPairs[0];
    } else {
      return null;
    } 
  }

  public static Merge(tsFields: TsField[]) {
    const unionMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );
    const tupleMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );

    let similarPairs: SimilarPair[] = [];
    for (let i = 0; i < tsFields.length - 1; ++i) {
      for (let j = 1; j < tsFields.length; ++j) {
        similarPairs.push({
          srcIndex: i,
          dstIndex: j,
          similarity: tsFields[i].Compare(tsFields[j]),
        });
      }
    }

    similarPairs.sort((a, b) => b.similarity - a.similarity);

    if (
      similarPairs.length > 0 &&
      similarPairs[0].similarity >= 0.2
    ) {
      const bestSimilarPair = similarPairs[0];
      const srcField = unionMap.get(bestSimilarPair.srcIndex) as TsField;
      const dstField = unionMap.get(bestSimilarPair.dstIndex) as TsField;
      const mergedField = srcField?.Merge(dstField);
      tupleMap.set(bestSimilarPair.srcIndex, mergedField);
      tupleMap.set(bestSimilarPair.dstIndex, mergedField);
    }

  }
}
