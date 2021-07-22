import fs from 'fs';
import { TS, TSCode } from './index';
import { ModelLoader } from './ts/modelLoader';

const jsonObject = {
  "list": [
    [ { "name": "sdf", "age": 14, "mores": [ { "address": "sh" } ] } ],
    [ { "name": "wrule", "age": 72, "mores": [ { "address": "sh" } ] } ]
  ],
  "test1": [1, true, "nish", {
    "ui": true,
    "srv": false
  }],
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
    "lang": ["js", "ts", "c/c++", "go", "c#", 12, true, 12, 12, 12]
  },
  "korean": {
    "movie": 13,
    "name": "korean",
    "nini": null,
    "bj": {
      "roomId": "sjsjjdhd",
      "fansNum": 12228277,
      "test": ["112", true]
    }
  },
  "unknow": []
};

const tsField = TS(jsonObject, 'rsp');
console.log(tsField.Hash());
const model = tsField.ToModel();
const list = ModelLoader.Flatten(model);
// console.log(list);
const models = ModelLoader.Pile(list);
// console.log(models);
const tsField2 = ModelLoader.Load(models[0]);
console.log(tsField2.Hash());
// console.log(modelCode.InterfaceNameInContext);
// fs.writeFileSync('output/output.ts', modelCode.DefineCode);
