const Router = require('koa-router')
const router = new Router()

const {signUp, signIn, verifyToken} = require('../controllers/user')

router.post('/signUp', async (ctx, next) => {
  await signUp(ctx)
})

router.post('/signIn', async (ctx, next) => {
  await signIn(ctx)
})

router.post('/verifyToken', async (ctx, next) => {
  await verifyToken(ctx)
})

module.exports = router.routes()
