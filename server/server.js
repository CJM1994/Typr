const express = require('express');
const app = express();
const morgan = require('morgan'); // Server logs
const dotenv = require('dotenv'); // Load ENV

PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.static('public')); // Serve static files
dotenv.config();

// Initialize Routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.get('/test', (req, res) => {
  res.send('Hello|World');
})

app.listen(PORT, () => {
  console.debug(`App listening on port ${PORT}`);
});