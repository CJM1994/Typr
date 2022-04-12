const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');

PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello|World');
})

app.listen(PORT, () => {
  console.debug(`App listening on port ${PORT}`);
});