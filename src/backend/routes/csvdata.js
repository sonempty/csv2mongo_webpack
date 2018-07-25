const Router = require('koa-router')
const router = new Router()
const jwt = require('jsonwebtoken')
const CSVData = require('../models/CSVData')

router.post('/', async (ctx, next) => {
  let token = ctx.request.header.authorization.split(' ')[1]
  jwt.verify(token, 'this_is_a_secret', function (err, decoded) {
    if (err) {
      ctx.throw(401, 'Access Denied')
    } else {
      let data = ctx.request.body
      CSVData.insertMany(data, function (err) {
        if (err) {
          console.log(err)
          ctx.throw(500, 'Server saved data error!')
        } else {
          ctx.body = 'Save Data success'
        }
      })
    }
  })
})

module.exports = router.routes()
