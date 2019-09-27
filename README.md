## Text Analyser

Microserviço de análise de texto baseado em verbos da `taxonimia de bloom`.

## Taxonomia de Bloom

```
Taxonomia é um termo bastante usado em diferentes
áreas e, segundo a Wikipédia (2006), é a ciência de classificação, denominação e organização de um
sistema pré-determinado e que tem como resultante
um framework conceitual para discussões, análises
e/ou recuperação de informação

http://www.scielo.br/pdf/gp/v17n2/a15v17n2.pdf
```

A aplicação utiliza da `Estruturação da Taxonomia de Bloom no domínio cognitivo` baseado em um conjunto de verbos organizados por categoria.

## Executando

**Pré requisitos**

NodeJs 8+(recomendado)

Instale as dependências do projeto, dentro da pasta raiz:

```
  npm install
```

Execute a aplicação:

```
  npm start
```

## Testes

A aplicação foi desenvolvida utilizando também `testes automatizados`, que facilita na implementação de novas funcionalidades e manutenções futuras.

A biblioteca utilizada foi `jest`:

**https://jestjs.io/**

Com as dependências instaladas execute o comando para rodar os testes automatizados:

```
  npm test
```
