import { EType } from '../type';

export interface IJsonObject {
  name: string;
  type: EType;
  fields?: IJsonObject[];
  element?: IJsonObject;
  elements?: IJsonObject[];
  members?: IJsonObject[];
}
