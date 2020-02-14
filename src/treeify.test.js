const fs = require('fs-extra');
const assert = require('assert');
const mochaEach = require('mocha-each');

const { getLineStartSpaces, rawFormatToObject } = require('./treeify');

const loadFixtureFile = async (name) => {
  const contents = await fs.readFile(`${__dirname}/fixtures/${name}.txt`);
  return contents.toString();
}

const loadFixtureJSONFile = async(name) => {
  const contents = await fs.readFile(`${__dirname}/fixtures/${name}.json`);
  const parsedContents = JSON.parse(contents.toString());
  return parsedContents;
}

const loadFixture = async (name) => {
  const raw = await loadFixtureFile(name);
  const json = await loadFixtureJSONFile(name);
  return { raw, json };
};

describe('treeify', () => {
  describe('#getLineStartSpaces', () => {
    mochaEach([
      ['test', 0],
      ['test    ', 0],
      [' test', 1],
      ['  test', 2],
      ['    test', 4],
    ])
    .it('evaluates "%s" to be "%d"', (line, count) => {
      assert.equal(getLineStartSpaces(line), count);
    });
 });

  describe('#rawFormatToObject', () => {
    describe("output matches fixtures", () => {
      mochaEach([
        "1", "2", "3",
      ])
      .it('fixture %s', async (fixtureName) => {
        const { raw, json } = await loadFixture(`rawFormatToObject/${fixtureName}`);
        const result = rawFormatToObject(raw);
        assert.deepEqual(result, json);
      });
    });
  });
});