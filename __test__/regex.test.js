const {
  buildRegexWithWords,
  minWordRegex,
  REGEX_BOUNDARY,
  REGEX_TEXT
} = require('../src/utils/regex');

const textRegex = new RegExp(REGEX_TEXT, 'gi');
const boundaryRegex = new RegExp(REGEX_BOUNDARY, 'gi');

function minRegexValidation(size) {
  if (size <= 0) return new RegExp();
  const regexText = `${REGEX_BOUNDARY}(${REGEX_TEXT}{1,${size}})${REGEX_BOUNDARY}`;
  return new RegExp(regexText, 'gi');
}

it('should validate every text character with REGEX_TEXT', () => {
  expect('aAzZZ22'.match(textRegex)).toEqual(['a', 'A', 'z', 'Z', 'Z']);
  expect('    '.match(textRegex)).toEqual(null);
  expect('*/-*2/31*12/3-**/sda'.match(textRegex)).toEqual(['s', 'd', 'a']);
  expect('d5a4d654dç'.match(textRegex)).toEqual(['d', 'a', 'd', 'd', 'ç']);
  expect('ãáâàéêèìóúùû'.match(textRegex).length).toEqual(
    'ãáâàéêèìóúùû'.split('').length
  );
});

it('should validate every boundary character with REGEX_BOUNDARY', () => {
  expect('\n \tdassda'.match(boundaryRegex)).toEqual(['\n', ' ', '\t']);
  expect('    '.match(boundaryRegex)).toEqual([' ', ' ', ' ', ' ']);
  expect('dadsasdasd'.match(boundaryRegex)).toEqual(null);
  expect('dasda\n adasdasd'.match(boundaryRegex)).toEqual(['\n', ' ']);
});

it('should verify if minwordsize function is returning the correct REGEX', () => {
  expect(minWordRegex(2)).toEqual(minRegexValidation(2));
  expect(minWordRegex(0)).toEqual(minRegexValidation(0));
  expect(minWordRegex(-1)).toEqual(minRegexValidation(-1));
  expect(minWordRegex('2')).toEqual(minRegexValidation('2'));
  expect(minWordRegex(5)).toEqual(minRegexValidation(5));
  expect(minWordRegex(100)).toEqual(minRegexValidation(100));
});

it('should return a regex made with just one word', () => {
  expect(buildRegexWithWords(['teste'])).toEqual(
    new RegExp(`${REGEX_BOUNDARY}(test(e)?)${REGEX_BOUNDARY}`, 'gi')
  );
  expect(buildRegexWithWords(['estudar'])).toEqual(
    new RegExp(`${REGEX_BOUNDARY}(estuda(r)?)${REGEX_BOUNDARY}`, 'gi')
  );
  expect(buildRegexWithWords(['ler'])).toEqual(
    new RegExp(`${REGEX_BOUNDARY}(le(r)?)${REGEX_BOUNDARY}`, 'gi')
  );
  expect(buildRegexWithWords(['atualizar'])).toEqual(
    new RegExp(`${REGEX_BOUNDARY}(atualiza(r)?)${REGEX_BOUNDARY}`, 'gi')
  );
  expect(buildRegexWithWords([''])).toEqual(new RegExp('', 'gi'));
  expect(buildRegexWithWords(['123'])).toEqual(
    new RegExp(`${REGEX_BOUNDARY}(12(3)?)${REGEX_BOUNDARY}`, 'gi')
  );
});

it('should return a regex made with more then one word', () => {
  let regexText = `${REGEX_BOUNDARY}(estuda(r)?)${REGEX_BOUNDARY}`;
  regexText += `|${REGEX_BOUNDARY}(brinca(r)?)${REGEX_BOUNDARY}`;
  regexText += `|${REGEX_BOUNDARY}(corre(r)?)${REGEX_BOUNDARY}`;
  regexText += `|${REGEX_BOUNDARY}(voa(r)?)${REGEX_BOUNDARY}`;

  expect(buildRegexWithWords(['estudar', 'brincar', 'correr', 'voar'])).toEqual(
    new RegExp(regexText, 'gi')
  );
});
