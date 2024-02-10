const express = require('express')
const router = express.Router()
const challengesCtrl = require('../controllers/challenges')

// GET module - index
router.post("/", challengesCtrl.challenges);


module.exports = router