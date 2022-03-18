const fs = require('fs-extra');

const argv = require('yargs')
  .option('input-file', {
    alias: 'i',
    type: 'string',
    description: 'The input file to parse',
    demandOption: true
  })
  .option('output-file', {
    alias: 'o',
    type: 'string',
    description: 'The output file',
    demandOption: true
  })
  .help()
  .argv

const run = async () => {
  if (!argv.inputFile) {
    console.error('inputFile argument is required.');
    return;
  }

  if (!argv.outputFile) {
    console.error('outputFile argument is required.');
    return;
  }

  const { inputFile, outputFile } = argv;

  const { treeifyFile } = require('../src/treeify');
  const result = await treeifyFile(`${process.cwd()}/${inputFile}`);
  await fs.writeFile(`${process.cwd()}/${outputFile}`, result);
}

run();