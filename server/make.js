// node make.js {name}
const fs = require('fs')
const args = process.argv
const path = require('path')

if (args.length < 3) {
  console.log('To use the command: node make.js {name of resource}')
} else {
  const resource = args[2].toLowerCase()
  const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1)

  const controllerName = `${resourceName}Controller`
  const modelName = `${resourceName}Model`
  const resourcePath = path.join(__dirname, resource)

  fs.mkdir(path.join(resourcePath, 'routes'), { recursive: true }, (err) => {
    if (err) throw err

    fs.writeFileSync(path.join(resourcePath, `${controllerName}.js`), `
const ${modelName} = require('./${modelName}')

module.exports = {
  async store(req, res) {
    return res.json([])
  },
  async index (req, res) {
    const ${resource} = await ${modelName}.find({})

    return res.json(${resource})
  }
}
`)

    fs.writeFileSync(path.join(resourcePath, `${modelName}.js`), `
const mongoose = require('mongoose')

const schema = {}

const ${resourceName}Schema = new mongoose.Schema(schema, { timestamps: true })

module.exports = mongoose.model('${resourceName}', ${resourceName}Schema)`)

    fs.writeFileSync(path.join(resourcePath, 'routes', 'index.js'), `
const route = require('express').Router()
const ${controllerName} = require('../${controllerName}')

route.get('/', ${controllerName}.index)
route.post('/', ${controllerName}.store)

module.exports = route
`)

    console.log(`Created Model/Controller/Routes for: ${resourceName}`)
  })
}
