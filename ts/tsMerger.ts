/**
 * 多结构合并器
 */
import { TsField } from './tsField';
import { SimilarPair } from './similarPair';
import { TsUnion } from './tsUnion';
import { TsUnknow } from './tsUnknow';
import { TsArray } from './tsArray';
import { TsTuple } from './tsTuple';

export class TsMerger {
  /**
   * 最优化合并一组字段
   * @param tsFields 字段列表
   * @returns 最优化合并信息
   */
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

  /**
   * 数组结构优化
   * @param name 字段名称
   * @param elements 元素列表
   * @returns 优化后的结果
   */
  public static ArrayMerge(name: string, elements: TsField[]): TsField {
    const result = TsMerger.merge(elements);
    const optimizedMembers = Array.from(result.unionMap.values());
    if (optimizedMembers.length < 1) {
      return new TsArray(name, new TsUnknow('element'));
    } else if (optimizedMembers.length < 2) {
      return new TsArray(name, optimizedMembers[0].UpdateName('element'));
    } else {
      const threshold = optimizedMembers.length / elements.length;
      if (threshold <= 0.4) {
        const unionField = new TsUnion('element', optimizedMembers);
        return new TsArray(name, unionField);
      } else {
        const tupleElements = result.tupleIndexs
          .map((key) => result.unionMap.get(key) as TsField);
        return new TsTuple(name, tupleElements);
      }
    }
  }

  /**
   * 成员优化
   * @param name 字段名称
   * @param members 成员列表
   * @returns 优化后的结果
   */
  public static Optimize(name: string, members: TsField[]): TsField {
    const result = TsMerger.merge(members);
    const optimizedMembers = Array.from(result.unionMap.values());
    if (optimizedMembers.length < 1) {
      return new TsUnknow(name);
    } else if (optimizedMembers.length < 2) {
      return optimizedMembers[0].UpdateName(name);
    } else {
      return new TsUnion(name, optimizedMembers);
    }
  }
}
