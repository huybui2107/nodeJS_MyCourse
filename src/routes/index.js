const searchRouter = require('./search')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const AccountRouter = require('./account')
const loginRouter = require('./login')
function route(app) {
  // app.get('/search', (req, res) => {
  //     res.render('search')

  //   })
  app.use('/me',meRouter);
  app.use('/search', searchRouter);
  app.use('/courses', coursesRouter);
  app.use('/account',AccountRouter);
  // app.post('/search', (req, res) => {
  //   console.log(req.body)
  //   res.send('')
  // })
  app.use('/auth',loginRouter)
  app.use('/', siteRouter);
}

module.exports = route;