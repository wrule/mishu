import { JsFactory, ModelLoader } from './index';

let test = null;

test = JsFactory
  .Create('test', 1)
  .ToTs()
  .Merge(
    JsFactory
      .Create('test', '123')
      .ToTs()
  )
  .Merge(
    JsFactory
      .Create('test', true)
      .ToTs()
  )
  .Merge(
    JsFactory
      .Create('test', 1)
      .ToTs()
  )

console.log(test.Hash());
const model = test.ToModel();
const test2 = ModelLoader.Load(model);
console.log(test2.Hash());
