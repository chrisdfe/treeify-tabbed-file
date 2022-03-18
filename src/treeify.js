const fs = require("fs-extra");
const treeify = require("object-treeify");
const set = require("lodash.set");

const TAB_SPACING = 2;
const PATH_SEPEARATOR = ".";

const isSpaceCharacter = str => str === " ";

const createPathSeperatorRegex = seperator =>
  new RegExp(`/\w\${seperator}\w/`, "g");

const getPathSeparatorCount = path => {
  const seperatorRegex = createPathSeperatorRegex(PATH_SEPEARATOR);
  return (path.match(seperatorRegex) || []).length;
};

const getLineStartSpaces = str => {
  let count = 0;
  for (let char of str) {
    if (isSpaceCharacter(char)) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

module.exports.getLineStartSpaces = getLineStartSpaces;

const rawFormatToObject = str => {
  const paths = [];
  const lines = str.split("\n");
  const currentPath = [];
  let currentTabIndex = -1;

  lines.forEach(line => {
    const spaceCount = getLineStartSpaces(line);
    const tabIndex = spaceCount / TAB_SPACING;
    const trimmedLine = line.trimLeft();
    
    // skip over empty lines
    if (!trimmedLine) {
      return
    };

    // Use indentation level to determine current tree depth
    if (tabIndex === currentTabIndex) {
      currentPath.pop();
    } else if (tabIndex < currentTabIndex) {
      const amountFewer = currentTabIndex - tabIndex;
      [...new Array(amountFewer + 1)].forEach(() => {
        currentPath.pop();
      });
    }

    currentPath.push(trimmedLine);

    paths.push(currentPath.join(PATH_SEPEARATOR));

    currentTabIndex = tabIndex;
  });

  const result = {};
  paths.forEach(path => {
    if (path) {
      set(result, path, {});
    }
  });

  return result;
};

module.exports.rawFormatToObject = rawFormatToObject;

const treeifyFile = async file => {
  const contents = await fs.readFile(file);
  const fileTreeObject = rawFormatToObject(contents.toString());
  const tree = treeify(fileTreeObject);
  return tree;
};

module.exports.treeifyFile = treeifyFile;
