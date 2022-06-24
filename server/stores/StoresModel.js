
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = {
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  votes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      cup: {
        type: Number,
        default: false
      },
      straw: {
        type: Number,
        default: 0
      },
      lid: {
        type: Number,
        default: 0
      },
      bag: {
        type: Number,
        default: 0
      }
    }
  ]
}

const StoresSchema = new mongoose.Schema(schema, { timestamps: true })

module.exports = mongoose.model('Stores', StoresSchema)
