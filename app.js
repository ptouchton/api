const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI-prod');
}
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const recipeRoutes = require('./routes/recipeRouter')();
const bookRouter = require('./routes/bookRouter')(Book);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use('/api', bookRouter);
app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my nodemon api');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

module.export = app;
