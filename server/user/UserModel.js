
const mongoose = require('mongoose')

const schema = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}

const UserSchema = new mongoose.Schema(schema, { timestamps: true })

UserSchema.pre('save', async function (next) {
  const duplicate = await mongoose.model('User', UserSchema).findOne({ email: this.email.toLowerCase() })

  if (duplicate) return next(new Error('Email already exists'))

  return next()
})

module.exports = mongoose.model('User', UserSchema)
