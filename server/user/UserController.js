const UserModel = require('./UserModel')
const { transformItem } = require('./UserTransformer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'MYSECRET'

module.exports = {
  async login (req, res) {
    try {
      // Find user by email
      const user = await UserModel.findOne({ email: req.body.email.toLowerCase() })

      if (!user) {
        throw new Error('Invalid Login')
      }

      // Compare passwords
      const valid = await bcrypt.compareSync(req.body.password, user.password)

      if (!valid) {
        throw new Error('Invalid Login')
      }

      const token = jwt.sign({ id: user._id }, secret)

      return res.status(200).json({ user: transformItem(user), token })
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid Login' })
    }
  },
  async store (req, res) {
    const saltRounds = 10

    const hash = await bcrypt.hashSync(req.body.password, saltRounds)

    const user = await UserModel.create({
      email: req.body.email,
      password: hash
    })

    const token = jwt.sign({ id: user._id }, secret)

    return res.status(200).json({ success: true, user: { email: user.email }, token })
  },
  async show (req, res) {
    return res.status(200).json({ user: req.user })
  }
}
