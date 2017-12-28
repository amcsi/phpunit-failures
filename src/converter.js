/**
 * Gets a list of matched tests.
 *
 * @param sourceString
 * @return {Array}
 */
function getMatches(sourceString) {
  const pattern = /\s+\d+\) ([\w\\\\:]+)/g;
  let match;
  const matches = [];
  // eslint-disable-next-line no-cond-assign
  while ((match = pattern.exec(sourceString)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function convertMatchesToPhpStormArgument(matches) {
  const escapeBackslahes = input => input.replace(/\\/g, '\\\\');
  return matches.length ?
    `--filter="/^(${escapeBackslahes(matches.join('|'))})/"` :
    '';
}

export { getMatches, convertMatchesToPhpStormArgument };

