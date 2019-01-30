const router = require('express').Router()
const model = require('../models')

router.get('/', (req, res) => {
    res.send('manager')
})

module.exports = router