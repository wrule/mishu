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
const jsonObject = test.ToJsonObject();
console.log(jsonObject);
const tsField = ModelLoader.Load(jsonObject);
console.log(tsField);

// test = JsFactory
//   .Create('test', 1)
//   .ToTs()
//   .Merge(
//     JsFactory
//       .Create('test', '123')
//       .ToTs()
//   )
//   .Merge(
//     JsFactory
//       .Create('test', true)
//       .ToTs()
//   )
// console.log(test);

// test = JsFactory
//   .Create('test', 1)
//   .ToTs()
//   .Merge(
//     JsFactory
//       .Create('test', '123')
//       .ToTs()
//   );
// console.log(test);

// test = JsFactory
//   .Create('test', 1)
//   .ToTs()
//   .Merge(
//     JsFactory
//       .Create('test', 2)
//       .ToTs()
//   );
// console.log(test);