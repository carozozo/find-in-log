const fs = require(`fs`);
const path = require(`path`);

const rootDir = `log`;
const outputDir = `output`;

const arg = require(`./arg`);
const logSplit = arg.logSplit;
const targetArr = arg.targetArr;

const findInOr = (eachLog, target) => {
  let found = '';
  for (const targetOfOr of target) {
    if (eachLog.includes(targetOfOr)) {
      found = targetOfOr;
      break;
    }
  }
  return found;
};

// 判斷每段 log 中是否有符合的關鍵字
const findTarget = (eachLog) => {
  let found = true;
  for (const target of targetArr) {
    if (Array.isArray(target)) {
      if (!findInOr(eachLog, target)) { // 該段 log 有包含任一關鍵字
        found = false;
        break;
      }
      continue;
    }

    if (!eachLog.includes(target)) { // 該段 log 有包含要找的關鍵字
      found = false;
      break;
    }
  }
  return found;
};

const outputFound = (filePath) => {
  const filename = path.basename(filePath, path.extname(filePath));
  const data = fs.readFileSync(filePath, `utf-8`);
  const logArr = data.split(logSplit);
  const logLength = logArr.length;

  console.log(`start trace in filePath= ${filePath}; logLength=${logLength}`);

  let count = 0;
  let foundLog = ''; // 有符合關鍵字的 log
  for (const i in logArr) {
    const eachLog = logArr[i]; // 每一段 log

    if (findTarget(eachLog)) {
      console.log(`found target, count=${++count}`);
      foundLog += `[${count}] ${eachLog}\n\n`;
    }
  }

  if (foundLog) {
    fs.writeFileSync(`${outputDir}/${filename}.txt`, foundLog, `utf8`);
  }
  return count;
};

let count = 0;
const loadFile = (fileOrDir) => {
  const stat = fs.statSync(fileOrDir);
  if (stat.isFile()) {
    count += outputFound(fileOrDir);
  }
  if (stat.isDirectory()) {
    const fileArr = fs.readdirSync(fileOrDir);
    for (const file of fileArr) {
      const filePath = path.join(fileOrDir, file);
      loadFile(filePath);
    }
  }
};

loadFile(rootDir);

console.log(`total count=${count}`);
process.exit();