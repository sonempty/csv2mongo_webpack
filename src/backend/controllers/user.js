const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

async function signUp (ctx) {
  const {email, password} = ctx.request.body
  if (!email || !password) {
    ctx.throw(400, 'Wrong data')
  } else {
    let user = await User.findOne({ email })
    if (user === null) {
      new User({email, password}).save()
      ctx.body = 'Success!'
    } else {
      ctx.throw(401, 'Duplicated email')
    }
  }
}

async function signIn (ctx) {
  let {email, password} = ctx.request.body
  if (email && password) {
    let user = await User.findOne({ email })
    let check = await bcrypt.compare(password, user.password)
    const token = jwt.sign({email, password}, 'this_is_a_secret', {expiresIn: '10h'})
    ctx.body = check ? {token} : 'wrong data!'
  } else {
    console.log(ctx.request.body)
    ctx.throw(400, 'Wrong data')
  }
}

async function verifyToken (ctx) {
  let token = ctx.request.header.authorization.split(' ')[1]
  jwt.verify(token, 'this_is_a_secret', function (err, decoded) {
    if (err) {
      ctx.body = ''
    } else {
      ctx.body = true
    }
  })
}

module.exports = {signUp, signIn, verifyToken}
