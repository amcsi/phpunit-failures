import bigExample from './converter_big_example.txt';
import { convertMatchesToPhpStormArgument, getMatches } from '../../../src/converter';

const simpleExample = `
9) amcsi\\playground\\test\\Class6Test::test3
This test did not perform any assertions

C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:212
C:\\Users\\attila\\AppData\\Roaming\\Composer\\vendor\\phpunit\\phpunit\\src\\TextUI\\Command.php:141

10) amcsi\\playground\\test\\Class7Test::test1
This test did not perform any assertions

`;

describe('converter', () => {
  it('should get the list of matches from a source string', () => {
    const result = getMatches(simpleExample);
    expect(result).to.have.length(2);
    expect(result[0]).to.equal('amcsi\\playground\\test\\Class6Test::test3');
    expect(result[1]).to.equal('amcsi\\playground\\test\\Class7Test::test1');
  });

  it('should show the correct PhpStorm test runner options', () => {
    const result = convertMatchesToPhpStormArgument(getMatches(bigExample));
    const expected = '--filter="/^(amcsi\\\\playground\\\\test\\\\Class3Test::testGetLargestPrimeFactor|amcsi\\\\playground\\\\test\\\\Class4Test::test1|amcsi\\\\playground\\\\test\\\\Class4Test::test2|amcsi\\\\playground\\\\test\\\\Class4Test::test3|amcsi\\\\playground\\\\test\\\\Class5Test::test1|amcsi\\\\playground\\\\test\\\\Class5Test::test2|amcsi\\\\playground\\\\test\\\\Class5Test::test3|amcsi\\\\playground\\\\test\\\\Class6Test::test1|amcsi\\\\playground\\\\test\\\\Class6Test::test2|amcsi\\\\playground\\\\test\\\\Class6Test::test3|amcsi\\\\playground\\\\test\\\\Class7Test::test1|amcsi\\\\playground\\\\test\\\\Class7Test::test2|amcsi\\\\playground\\\\test\\\\Class7Test::test3|amcsi\\\\playground\\\\test\\\\Class8Test::test1|amcsi\\\\playground\\\\test\\\\Class8Test::test2|amcsi\\\\playground\\\\test\\\\Class8Test::test3|amcsi\\\\playground\\\\test\\\\Class9Test::test1|amcsi\\\\playground\\\\test\\\\Class9Test::test2|amcsi\\\\playground\\\\test\\\\Class9Test::test3)/"'
    expect(result).to.equal(expected);
  });
});
