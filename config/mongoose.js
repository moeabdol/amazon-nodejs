const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.db, { useMongoClient: true })
  .then(() => console.log('Connected to', config.db))
  .catch(err => console.log(err));
