module.exports = {
  // 用來拆解每段 log 的 regexp 或 string
  logSplit: /\+(\d)ms/,
  // 要找的關鍵字
  // e.g. ['a', 'b', 'c'] => 要同時包含 a,b,c
  // e.g. ['a', 'b', ['c', 'd']] => 要同時包含 a,b,c 或是 a,b,d
  targetArr: [
  ]
};
