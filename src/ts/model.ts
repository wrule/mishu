import { EType } from '../type';

/**
 * 定义TypeScript模型的接口
 */
export interface IModel {
  name: string;
  type: EType;
  children?: IModel[];
  path?: string;
}
