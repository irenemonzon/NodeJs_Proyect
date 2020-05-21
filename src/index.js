const express = require('express');

const routes = require('./routes');

const app = express();
routes(app);

app.listen(4000, () => {
  console.log('runnig on 4000');
});
