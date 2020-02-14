const fs = require('fs-extra');
const treeify = require('object-treeify');
const set = require('lodash.set');

const TAB_SPACING = 2;
const PATH_SEPEARATOR = '.'

const isSpaceCharacter = str => str === ' ';

const getPathSeparatorCount = (path) => {
  let count = 0;
  for (let char of path) {
    if (char === PATH_SEPEARATOR) {
      count ++;
    }
  }
  return count;
}

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
}

module.exports.getLineStartSpaces = getLineStartSpaces;

const rawFormatToObject = (str) => {
  const paths = [];
  const lines = str.split('\n');
  const currentPath = [];
  let currentTabIndex = -1;

  lines.forEach(line => {
    const spaceCount = getLineStartSpaces(line);
    const tabIndex = spaceCount / TAB_SPACING;
    const trimmedLine = line.trimLeft();
    if (!trimmedLine) return;

    if (tabIndex === currentTabIndex) {
      currentPath.pop();
    } else if (tabIndex < currentTabIndex) {
      const amountFewer = currentTabIndex - tabIndex;
      // console.log('amountFewer', amountFewer, ": ", tabIndex, currentTabIndex);
      [...(new Array(amountFewer + 1))].forEach(() => {
        currentPath.pop();
      })
    }

    currentPath.push(trimmedLine);

    // console.log('currentPath', currentPath.join(PATH_SEPEARATOR))
    paths.push(currentPath.join(PATH_SEPEARATOR));

    currentTabIndex = tabIndex;
  });

  const sortedPaths = [...paths].sort((pathA, pathB) => {
    const pathASeperatorCount = getPathSeparatorCount(pathA);
    const pathBSeperatorCount = getPathSeparatorCount(pathB);
    return pathASeperatorCount - pathBSeperatorCount;
  })

  // console.log('sortedPaths', sortedPaths)

  const result = {};
  sortedPaths.forEach(path => {
    if (path) {
      set(result, path, {});
    }
  });

  // console.log('result', JSON.stringify(result, null, 4))

  return result;
}

module.exports.rawFormatToObject = rawFormatToObject;

const treeifyFile = async (file) => {
   const contents = await fs.readFile(file);
   const fileTreeObject = rawFormatToObject(contents.toString());
   const tree = treeify(fileTreeObject);
   return tree;
}

module.exports.treeifyFile = treeifyFile;