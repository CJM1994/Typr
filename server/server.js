const express = require('express');
const app = express();
const morgan = require('morgan'); // Server logs
const dotenv = require('dotenv'); // Load ENV
const mongoose = require('mongoose');
const bp = require('body-parser')
const PORT = process.env.PORT || 3001;

require('dotenv').config();

//Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(morgan('dev'));
app.use(express.static('public')); // Serve static files
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
dotenv.config();

// Initialize Routes
const userRoutes = require('./routes/userRoutes');
const promptRoutes = require('./routes/prompt');
const bodyParser = require('body-parser');

app.use("/", userRoutes);
app.use("/prompts", promptRoutes);


app.get('/home', (req, res) => {
  res.send('Hello|World');
})

app.listen(PORT, () => {
  console.debug(`App listening on port ${PORT}`);
});