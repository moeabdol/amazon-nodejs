require('dotenv').config();

const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const session    = require('express-session');
const flash      = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const passport   = require('passport');
const path       = require('path');

const config      = require('./config/config');
const Category    = require('./models/category');
const mainRoutes  = require('./routes/main');
const userRoutes  = require('./routes/users');
const adminRoutes = require('./routes/admin');

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

// Configure express-session middleware
app.use(session({
  secret: config.secret,
  name: 'amazon-clone',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: config.db, autoReconnect: true })
}));

// Configure connect-flash middleware
app.use(flash());

// Configure passport middlware (must be included after express-session)
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware to select all categories
app.use((req, res, next) => {
  Category.find().select('name')
    .then(categories => {
      res.locals.categories = categories;
      next();
    })
    .catch(err => next(err));
});

// Global variables
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();
});

// Configure routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log('Server started at port 3000');
});
