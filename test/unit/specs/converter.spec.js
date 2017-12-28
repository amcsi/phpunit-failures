import bigExample from './converter_big_example.txt';
import { convertMatchesToPhpStormArgument, getMatches, test } from '../../../src/converter';

const simpleExample = `
9) amcsi\\playground\\test\\Class6Test::test3
This test did not perform any assertions

C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:212
C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:141

10) amcsi\\playground\\test\\Class7Test::test1
This test did not perform any assertions

`;

const groupedExample = `
9) amcsi\\playground\\test\\Class6Test::test1
This test did not perform any assertions

C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:212
C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:141

10) amcsi\\playground\\test\\Class6Test::test2
This test did not perform any assertions

`;

describe('converter', () => {
  it('should get the list of matches from a source string', () => {
    const result = getMatches(simpleExample);
    expect(result).to.have.length(2);
    expect(result[0]).to.equal('amcsi\\playground\\test\\Class6Test::test3');
    expect(result[1]).to.equal('amcsi\\playground\\test\\Class7Test::test1');
  });

  it('should be able to split a match into parts', () => {
    const result = test.getMatchParts('amcsi\\playground\\test\\Class6Test::test3 with data set #3');
    const expected = {
      _class: 'amcsi\\playground\\test\\Class6Test::',
      method: 'test3',
      dataset: ' with data set #3',
    };
    expect(result).to.deep.equal(expected);
  });

  it('should ignore dataset if there is none', () => {
    const result = test.getMatchParts('amcsi\\playground\\test\\Class6Test::test3');
    const expected = {
      _class: 'amcsi\\playground\\test\\Class6Test::',
      method: 'test3',
      dataset: '',
    };
    expect(result).to.deep.equal(expected);
  });

  it('should group methods into one if there are more', () => {
    const methodKeyObject = { method1: [' with data set #1'], method2: [''] };
    const result = test.groupMethods(methodKeyObject);
    const expected = '(method1 with data set #1|method2)';
    expect(result).to.equal(expected);
  });

  it('should group tests together as long as datasets are not involved', () => {
    const result = convertMatchesToPhpStormArgument(getMatches(groupedExample));
    const expected = '--filter' +
      ' "/amcsi\\\\playground\\\\test\\\\Class6Test::(test1|test2)$/"';
    expect(result).to.equal(expected);
  });

  it('should show the correct PhpStorm test runner options', () => {
    const result = convertMatchesToPhpStormArgument(getMatches(bigExample));
    const expected = '--filter "/(amcsi\\\\playground\\\\test\\\\Class3Test::testGetLargestPrimeFactor with data set #3|amcsi\\\\playground\\\\test\\\\Class4Test::(test1|test2|test3)|amcsi\\\\playground\\\\test\\\\Class5Test::(test1|test2|test3)|amcsi\\\\playground\\\\test\\\\Class6Test::(test1|test2|test3)|amcsi\\\\playground\\\\test\\\\Class7Test::(test1|test2|test3)|amcsi\\\\playground\\\\test\\\\Class8Test::(test1|test2|test3)|amcsi\\\\playground\\\\test\\\\Class9Test::(test1|test2|test3))$/"';
    expect(result).to.equal(expected);
  });
});
