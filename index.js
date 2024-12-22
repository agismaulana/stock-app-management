require('module-alias/register')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')

const route = require('./src/routes/route')
const router = express.Router()


dotenv.config();

app.use(cors());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000000 }));

app.use(session({
  secret: 'Storage-management',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.locals.user = req.session;
  next();
});

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

route(app, router);

// Create a Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
