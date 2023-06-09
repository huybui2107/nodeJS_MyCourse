const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const session = require('express-session')


db.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddleware);
// HTTP logger
app.use(morgan('combined'))

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 6000000//the time expires of cookie is 2 min
  }
}));

//  Tempalte engine
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a + b,
    sortable:(field,sort) => {
      const sortType = field === sort.column ? sort.type :'default';
               const icons = {
                 default :'oi oi-elevator',
                 asc :'oi oi-sort-ascending',
                 desc :'oi oi-sort-descending'
               };
               const types ={
                default:'desc',
                asc:'desc',
                desc:'asc',
               }
               const icon = icons[sortType];
               const type = types[sort.type];
               return `<a href="?_sort&column=${field}&type=${type}">
               <span class="${icon}"></span>
             </a>`
    }
 }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));
route(app);

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})