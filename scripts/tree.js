const fs = require('fs-extra');

const run = async () => {
  // const argv = require('yargs')
  //   .option('input-file', {
  //     alias: 'i',
  //     type: 'string',
  //     description: 'The input file to parse',
  //     demandOption: true
  //   })
  //   .option('output-file', {
  //     alias: 'o',
  //     type: 'string',
  //     description: 'The output file',
  //     demandOption: true
  //   })
  //   .help()
  //   .argv

  // console.log('argv', argv)
  const { treeifyFile } = require('../src/treeify');
  const result = await treeifyFile(`${__dirname}/source.txt`);
  await fs.writeFile(`${__dirname}/source.txt`, result);
}

run();