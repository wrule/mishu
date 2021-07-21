import { JsFactory } from '../js/jsFactory';

export function TS(data: any, name: string = 'something') {
  return JsFactory.Create(name, data).ToTs();
}

export function TSCode(data: any, name: string = 'something') {
  return TS(data, name).ToCodeModel();
}
