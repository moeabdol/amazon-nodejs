const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');

const app = express();

// Disable x-powered-by header
app.disable('x-powered-by');

// Connect to database
require('./config/mongoose');

// Configure morgan middleware
app.use(morgan('dev'));

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server started at port 3000');
});
