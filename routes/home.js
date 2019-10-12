const express = require('express')
const router = express.Router()
const categoryList = require('../models/data/category.json').results
const monthList = require('../models/data/months.json').results
const db = require('../models')
const User = db.User
const Record = db.Record
const { authenticated } = require('../config/auth')
const { Op } = sequelize = require('sequelize')

const icons = {
  "home": "home",
  "traffic": "shuttle-van",
  "entertainment": "grin-beam",
  "food": "utensils",
  "other": "pen"
}

router.get('/', authenticated, (req, res) => {
  const filterMonth = req.query.filterMonth || ''
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryChineseName = categoryList[filterCategory] === undefined ? '' : categoryList[filterCategory]['chineseName']

  let sql = [{ userId: req.user.id }]

  if (filterCategory) {
    sql.push({ category: filterCategory })
  }
  if (filterMonth) {
    sql.push(sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), filterMonth))
  }

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findAll({
        where: {
          [Op.and]: sql
        }
      })
    })
    .then((records) => {
      //show icons
      records.forEach(record => {
        record.icon = icons[record.category]
      })

      //sum amount
      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
      }

      //create data for chart
      let subtotals = []
      let subtotalList = []
      for (record of records) {
        if (!subtotals[record.category]) {
          subtotals[record.category] = 0
          subtotals[record.category] += Number(record.amount)
        } else {
          subtotals[record.category] += Number(record.amount)
        }
      }

      for (category in categoryList) {
        (subtotals[category]) ? subtotalList.push(+subtotals[category]) : subtotalList.push(0)
      }

      return res.render('index', {
        records,
        categoryList,
        monthList,
        totalAmount,
        subtotalList,
        filterCategory,
        filterMonth,
        filterCategoryChineseName
      })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router