let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    index = require('./controllers/index.js');

  require('./db');

app.listen(process.env.PORT || 8080, () => {
  console.log('Server works!');
})

app.use(bodyParser.json());

app.use(express.static('build'));

app.use('/', index);
app.use('/api/v1', index);

app.set('view engine', 'jade');

module.exports = app;