import { JsFactory, ModelLoader } from './index';

const jsonObject = {
  "name": "jimao",
  "sex": true,
  "age": 99,
  "address": "浙江省杭州市",
  "tags": ["程序员", "跑步", "看书"],
  "tuple": [
    ["m1", 1],
    ["m2", 2],
    ["m3", 3]
  ],
  "meta": {
    "color": "red",
    "lang": ["js", "ts", "c/c++", "go", "c#"]
  },
  "unknow": []
};

const jsField = JsFactory.Create('rsp', jsonObject);
const tsField = jsField.ToTs();
const modelCode = tsField.ToCodeModel();
console.log(modelCode.InterfaceName);
console.log(modelCode.DefineCode);
