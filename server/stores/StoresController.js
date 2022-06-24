
const StoresModel = require('./StoresModel')

module.exports = {
  async store (req, res) {
    const result = await StoresModel.create({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      votes: [{
        userId: req.user._id,
        cup: req.body.cups,
        straw: req.body.straw,
        lid: req.body.lid,
        bag: req.body.bag
      }]
    })

    return res.json({ result })
  },

  async index (req, res) {
    const stores = await StoresModel.find({})

    return res.json(stores)
  },

  async show (req, res) {
    const store = await StoresModel.findOne({ _id: req.params.id }).lean()

    store.voteSummary = store.votes.reduce((prev, current) => {
      return {
        cup: prev.cup + current.cup,
        straw: prev.straw + current.straw,
        lid: prev.lid + current.lid,
        bag: prev.bag + current.bag
      }
    }, {
      cup: 0,
      straw: 0,
      lid: 0,
      bag: 0
    })

    store.score = {
      value: Object.keys(store.voteSummary).reduce((prev, curr) => {
        return prev + (store.voteSummary[curr] > 0 ? 1 : 0)
      }, 0),
      total: Object.keys(store.voteSummary).length
    }

    return res.json({ store })
  },

  async vote (req, res) {
    const store = await StoresModel.findOne({ _id: req.params.id })

    store.votes.push({
      userId: req.user._id,
      cup: req.body.cup,
      straw: req.body.straw,
      lid: req.body.lid,
      bag: req.body.bag
    })

    const result = await store.save()

    return res.json(result)
  }
}
