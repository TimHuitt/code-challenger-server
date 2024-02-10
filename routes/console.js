const express = require('express')
const router = express.Router()
const consoleCtrl = require('../controllers/console')

// GET module - index
router.post("/", consoleCtrl.console);


module.exports = router