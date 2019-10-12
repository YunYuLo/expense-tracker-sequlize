const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')

const db = require('../models')
const User = db.User
const Record = db.Record

router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// create a new post
router.post('/', authenticated, (req, res) => {
  const { name, date, merchant, category, amount } = req.body

  let errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '＊欄位為必填欄位！' })
  }
  if (isNaN(amount)) {
    errors.push({ message: `金額必須是數字` })
  }

  if (errors.length > 0) {
    res.render('new', {
      errors,
      name,
      date,
      merchant,
      category,
      amount
    })
  } else {
    Record.create({
      name,
      date,
      merchant,
      category,
      amount,
      UserId: req.user.id
    })
      .then((record) => { return res.redirect('/') })
      .catch((error) => { return res.status(422).json(error) })
  }
})

//edit page
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found.')
      return Record.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((records) => {
      return res.render('edit', {
        records,
      })
    })
})

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((records) => {
      records.name = req.body.name
      records.date = req.body.date
      records.merchant = req.body.merchant
      records.category = req.body.category
      records.amount = req.body.amount

      return records.save()
    })
    .then((records) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

//delete
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Record.destroy({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router