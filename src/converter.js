/**
 * Gets a list of matched tests.
 *
 * @param sourceString
 * @return {Array}
 */
function getMatches(sourceString) {
  const pattern = /\s+\d+\) ([\w\\\\:]+( with data set [^\s]+)?)/g;
  let match;
  const matches = [];
  // eslint-disable-next-line no-cond-assign
  while ((match = pattern.exec(sourceString)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

/**
 * Returns a string joined with a pipe (|) and surrounded by parentheses for regex.
 * If there is only one string, it does not surround the string with parentheses.
 *
 * @param {String[]} stringArray
 * @return String
 */
function joinRegex(stringArray) {
  return stringArray.length > 1 ?
    `(${stringArray.join('|')})` :
    stringArray[0];
}

function convertMatchesToPhpStormArgument(matches) {
  const classes = {};
  matches.forEach(match => {
    const { _class, method, dataset } = getMatchParts(match);
    if (!classes[_class]) {
      classes[_class] = {};
    }
    const savedClassMethods = classes[_class];
    if (!savedClassMethods[method]) {
      savedClassMethods[method] = [];
    }
    const savedMethodDatasets = savedClassMethods[method];
    savedMethodDatasets.push(dataset);
  });
  const tests = Object.keys(classes).map(className => {
    return className + groupMethods(classes[className]);
  });
  const escapeBackslahes = input => input.replace(/\\/g, '\\\\');
  return matches.length ?
    `--filter "/${escapeBackslahes(joinRegex(tests))}$/"` :
    '';
}

function getMatchParts(match) {
  const [, _class, method, dataset] = match.match(/^([^:]+::)([^ ]+)( with data set .*)?$/);
  return { _class, method, dataset: dataset || '' };
}

function groupMethods(methodKeyObject) {
  const asArray = Object.keys(methodKeyObject).map(method => method + joinRegex(methodKeyObject[method]));
  return joinRegex(asArray);
}

/** Methods not to be used, but exposed for testing purposes */
const test = { getMatchParts, groupMethods };

export { getMatches, convertMatchesToPhpStormArgument, test};

