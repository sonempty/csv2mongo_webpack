const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const mongoose = require('mongoose')

const Router = require('koa-router')
const router = new Router()

const app = new Koa()
app.use(bodyParser())
app.use(cors())

require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5000)
mongoose.connect('mongodb://localhost:27017/csv2mongo')
module.exports = app
