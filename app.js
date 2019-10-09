const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const Record = db.Record
const User = db.User

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log('App is running')
})