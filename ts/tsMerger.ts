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
    const tupleMap = new Map<number, TsField>(
      tsFields.map((tsField, index) => [index, tsField])
    );
    const unionMap = new Map<number, TsField>(
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
      const mergedField = srcField.Merge(dstField);
      unionMap.set(bestSimilarPair.srcIndex, mergedField);
      unionMap.delete(bestSimilarPair.dstIndex);
      similarPairs = similarPairs.filter(
        (pair) => !(
          (pair.srcIndex === bestSimilarPair.srcIndex && pair.dstIndex === bestSimilarPair.dstIndex) ||
          (pair.srcIndex === bestSimilarPair.dstIndex && pair.dstIndex === bestSimilarPair.srcIndex)
        )
      );
      similarPairs.forEach((pair) => {
        if (pair.srcIndex === bestSimilarPair.srcIndex) {
          const srcField = unionMap.get(pair.srcIndex) as TsField;
          const dstField = unionMap.get(pair.dstIndex) as TsField;
          pair.similarity = srcField.Compare(dstField);
        }
        if (pair.dstIndex === bestSimilarPair.srcIndex) {
          const srcField = unionMap.get(pair.srcIndex) as TsField;
          const dstField = unionMap.get(pair.dstIndex) as TsField;
          pair.similarity = srcField.Compare(dstField);
        }
        if (pair.srcIndex === bestSimilarPair.dstIndex) {

        }
        if (pair.dstIndex === bestSimilarPair.dstIndex) {
          
        }
      });
    }

  }
}
