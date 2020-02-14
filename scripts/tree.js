const fs = require('fs-extra');

const run = async () => {
  const { treeifyFile } = require('../src/treeify');
  const result = await treeifyFile(`${__dirname}/structure.txt`);
  await fs.writeFile(`${__dirname}/structure-tree.txt`, result);
}

run()