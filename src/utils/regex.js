/**
 * REGEX que representa uma `borda`, é utilizado para encontrar as palavras
 * dentro do texto.
 * Uma palavra é identificado dentro de um texto quando está `cercada` por bordas,
 * como no exemplo abaixo:
 * Na frase: Hoje é um dia bonito
 * As palavras ['Hoje', 'é', 'um', 'dia', 'bonito'] possuem `bordas/espaços` que as
 * separam, logo podem ser consideradas como palavras individualmente.
 */
const REGEX_BOUNDARY = `[^A-Za-záàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ]`;

const REGEX_TEXT = `[A-Za-záàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ]`;

/**
 * REGEX para encontrar palavras menores que um determinado tamanho dentro do texto
 */
function minWordRegex(size = 0) {
  if (size <= 0) return new RegExp();
  const regexText = `${REGEX_BOUNDARY}(${REGEX_TEXT}{1,${size}})${REGEX_BOUNDARY}`;
  return new RegExp(regexText, 'gi');
}

/**
 * @param {string} word palavra a ser utilizada no template
 * Essa função monta uma parte de um regex utilizando uma palavra provinda
 * como parâmetro externo
 * Exemplo: A partir da palavra `executar` como parâmetro, é espeardo:
 * `\b(executa(r)?)\b` como responsta.
 *
 * ps: \b se refere a borda citada acima
 */
function wordRegexTemplate(word) {
  if (!word) return '';
  const splitedWord = word.split('');
  const lastWord = splitedWord.pop();
  const wordWithoutLastWord = splitedWord.join('');

  return `${REGEX_BOUNDARY}(${wordWithoutLastWord}(${lastWord})?)${REGEX_BOUNDARY}`;
}

/**
 * Junta a regex de todas palavras, montando uma regex completa para cada lista de palavras
 */
function buildRegexWithWords(words) {
  const regex = new RegExp(words.map(wordRegexTemplate).join('|'), 'gi');
  return regex;
}

module.exports = {
  REGEX_BOUNDARY,
  REGEX_TEXT,
  buildRegexWithWords,
  minWordRegex
};
