var merge = require("lodash.merge")
let arrString = ["propA.propB.PropC", "propA.propB.PropD", "propE.propF"]

const createObject = function (key, value) {
  let obj = {}
  const parts = key.split(".")
  if (parts.length == 1) {
    obj[parts[0]] = value
  } else if (parts.length > 1) {
    const remainingParts = parts.slice(1, parts.length).join(".")
    obj[parts[0]] = createObject(remainingParts, value)
  }
  return obj
}

let obj = {}
for (let str of arrString) {
  const intermediateObj = createObject(str, "")
  obj = merge({}, obj, intermediateObj)
}

console.log(obj)
