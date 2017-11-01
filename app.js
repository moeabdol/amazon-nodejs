const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const path       = require('path');

const userRoutes = require('./routes/users');

const app = express();

// Disable x-powered-by header
app.disable('x-powered-by');

// Connect to database
require('./config/mongoose');

// Configure static file directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Configure handlebars engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Configure morgan middleware
app.use(morgan('dev'));

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure routes
app.use('/users', userRoutes);

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server started at port 3000');
});
