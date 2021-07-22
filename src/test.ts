import fs from 'fs';
import { TSCode } from './index';

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

const modelCode = TSCode(jsonObject, 'rsp');
console.log(modelCode.InterfaceNameInContext);
fs.writeFileSync('output/output.ts', modelCode.DefineCode);
