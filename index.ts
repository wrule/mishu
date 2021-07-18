import { JsFactory } from "./js/jsFactory";

const obj = {
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

const jsField = JsFactory.Create('my', obj);
console.log(jsField.Hash());
const tsField = jsField.ToTs();
console.log(tsField);
