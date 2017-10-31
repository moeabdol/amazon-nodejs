const express = require('express');
const morgan  = require('morgan');

const app = express();

// Disable x-powered-by header
app.disable('x-powered-by');

// Configure morgan middleware
app.use(morgan('dev'));

// Configure routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server started at port 3000');
});
