const express = require('express')
const router = express.Router()
const promptsCtrl = require('../controllers/prompts')

// GET module - index
router.post("/prompts", promptsCtrl.prompts);
router.post("/stories", promptsCtrl.stories);


module.exports = router