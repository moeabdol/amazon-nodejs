const express = require('express');

const app = express();

// Disable x-powered-by header
app.disable('x-powered-by');

// Configure routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server started at port 3000');
});
