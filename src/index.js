const { text } = require('../_data.js');
const { buildRegexWithWords, minWordRegex } = require('./utils/regex');

/**
 * Importação de todos os arquivos referente a `taxonomia de bloom`
 * http://www.scielo.br/pdf/gp/v17n2/a15v17n2.pdf
 * São arquivos .json que possuem uma lista de verbos categorizados
 * de acordo com a taxonomia
 */
const analise = require('../bloom/analise.json');
const aplicacao = require('../bloom/aplicacao.json');
const avaliacao = require('../bloom/avaliacao.json');
const compreensao = require('../bloom/compreensao.json');
const conhecimento = require('../bloom/conhecimento.json');
const sintese = require('../bloom/sintese.json');

const ignoreWordSize = 0;

/**
 * Calcula a porcentagem de ocorrência de uma categoria baseado no
 * total de palavras
 */
function calculatePontuation(regexMatchResult, totalWords) {
  if (!regexMatchResult) return '0%';
  const percent = ((regexMatchResult.length / totalWords) * 100).toFixed(4);
  return percent + '%';
}

function getResultsAboutCategory(sanitizedText, totalWords, category) {
  const regexMatchResult = sanitizedText.match(buildRegexWithWords(category));

  if (!regexMatchResult) return { percent: 0, ammount: 0, words: [] };

  const wordsWihtoutBoundaries =
    regexMatchResult.map(word => word.trim()) || [];

  return {
    percent: calculatePontuation(wordsWihtoutBoundaries, totalWords),
    ammount: wordsWihtoutBoundaries.length || 0,
    words: wordsWihtoutBoundaries
  };
}

function makeTextAnalyse(text) {
  /**
   * Limpa um texto, removendo espaços desnecessários, enters e tabs
   * Adiciona um espaço no inicio e no final do texto, para que
   * a primeira e ultima palavra seja considerado uma palavra entre bordas
   * E duplica todos os espaços entre palavras, para facilitar a busca delas
   * via REGEX
   */
  const textWithSpacesInBoundary = ` ${text} `;
  const sanitizedText = textWithSpacesInBoundary
    .replace(/ {1,}/g, '  ')
    .replace(/[\n\r\t]/g, '')
    .replace(minWordRegex(ignoreWordSize), '');

  /**
   * Faz a contagem de palavras presentes no texto
   * Remove 2, pois são os valores em brancos adicionados no inicio e no
   * final do texto sanitizado
   * Remove os  espaços duplicados entre palavras
   */
  const totalWords = sanitizedText.replace(/ {2}/g, ' ').split(' ').length - 2;

  return {
    text: { totalWords },
    bloom: {
      analise: getResultsAboutCategory(sanitizedText, totalWords, analise),
      sintese: getResultsAboutCategory(sanitizedText, totalWords, sintese),
      avaliacao: getResultsAboutCategory(sanitizedText, totalWords, avaliacao),
      analise: getResultsAboutCategory(sanitizedText, totalWords, analise),
      aplicacao: getResultsAboutCategory(sanitizedText, totalWords, aplicacao),
      compreensao: getResultsAboutCategory(
        sanitizedText,
        totalWords,
        compreensao
      ),
      conhecimento: getResultsAboutCategory(
        sanitizedText,
        totalWords,
        conhecimento
      )
    }
  };
}

console.log(JSON.stringify(makeTextAnalyse(text), null, 1));
