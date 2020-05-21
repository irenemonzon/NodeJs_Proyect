const express = require('express');
const { countries, languages } = require('countries-list');
const { info } = require('./modules/mylog');

const app = express();

app.get('/', (request, response) => {
  response.status(200).send('Hello');
});

app.get('/info', (request, response) => {
  info('hola info');
  response.send('info nodemon');
});

app.get('/country', (request, response) => {
  //console.log('request.query', request.query);
  response.json(countries[request.query.code]);
});

app.get('/languages/:lang/', (request, response) => {
  //console.log('request.params', request.params);
  const lang = languages[request.params.lang];
  if (lang) {
    response.json({
      status: 'OK',
      data: lang
    });
  } else {
    response.status(404).json({
      status: 'NOT FOUND',
      message: `language ${request.params.lang} not found`
    });
  }
});

app.get('*', (request, response) => {
  response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
  //console.log('runnig on 4000');
});
