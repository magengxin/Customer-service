/**
*  树转数组
*  @param root - JSON Tree
*  @param isParentFn - 判断是否是父节点，函数返回 是 或 否
*  @param isChildrenFn - 判断是否是子节点，函数返回 是 或 否
*  @returns array  - 子节点
*/
export function convertTreeToList(root, isParentFn, isChildrenFn) {
  var stack = [], array = [];
  stack.push(root);

  while (stack.length !== 0) {
    var node = stack.pop();
    if (node instanceof Array) {
      for (let i = node.length - 1; i >= 0; i--) {
        stack.push(node[i]);
      }
    } else if (isParentFn(node) && node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    } else if (isChildrenFn(node)) {
      array.push(node);
    }
  }

  return array;
}

/**
  * 数组-追加属性
*  @param target {validate:(obj)=>{return true/flase},prop:{}}
  */
export function arrayPushPrototype(array, target = []) {
  for (const index in array) {
    const item = array[index]
    if (item instanceof Object) {
      target.forEach(e => {
        if (e.validate(item)) {
          for (const key in e.prop) {
            item[key] = e.prop[key]
          }
        }
      })
      if (item.children && item.children.length > 0) {
        arrayPushPrototype(item.children, target)
      }
    } else if (item instanceof Array) {
      arrayPushPrototype(array[index], target)
    }
  }
}

/**
  * 数组-属性更名
  */
export function arrayReplacePrototypeName(array, target, source) {
  for (const index in array) {
    const item = array[index]
    if (item instanceof Object) {
      if (item.hasOwnProperty(source)) {
        item[target] = item[source]
        delete item[source]
      }
      if (item.children && item.children.length > 0) {
        arrayReplacePrototypeName(item.children, target, source)
      }
    } else if (item instanceof Array) {
      arrayReplacePrototypeName(array[index], target, source)
    }
  }
}

/**
  * 过滤
*  @param target {validate:(obj)=>{return true/flase},prop:{}}
  */
export function arrayFilter(source, isFun) {
  let array = copy(source)
  let i = 0
  for (; i < array.length;) {
    let item = array[i]
    //判断子集
    if (item && item.children && item.children.length > 0) {
      let children = arrayFilter(item.children, isFun)
      if (children && children.length > 0) {
        item.children = children
        i++
        continue
      } else {
        delete item.children
      }
    }
    //判断本身
    if (item && isFun(item)) {
      i++
      continue
    }
    array.splice(i, 1)
  }
  return array
}

/**
 * 深拷贝
 * @param {深拷贝} source 
 */
export function copy(source) {
  return JSON.parse(JSON.stringify(source))
}


/**
 * 数组-删除子项
 */
export function arrayRemoveItem(array, isFun, boolRemovePrototype = true) {
  let i = 0
  while (i < array.length) {
    const item = array[i]
    //主项
    if (isFun(item)) {
      array.splice(i, 1)
      continue
    }
    //子项
    if (item.children) {
      arrayRemoveItem(item.children, isFun, boolRemovePrototype)

      if (item.children.length == 0 && boolRemovePrototype) {
        delete item.children
      }
    }
    i++
  }
}

/**
 * Key所在的数组、索引、对象
 * @param {*} data 
 * @param {*} key 
 * @param {*} callback 
 */
export function loop(data, key, callback) {
  data.forEach((item, index, arr) => {
    if (item.key === key) {
      return callback(item, index, arr);
    }
    if (item.children) {
      return loop(item.children, key, callback);
    }
  });
}