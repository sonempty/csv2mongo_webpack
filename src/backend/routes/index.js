module.exports = (router) => {
  router.prefix('/api')
  router.use('/user', require('./user'))
  router.use('/csvdata', require('./csvdata'))
}
