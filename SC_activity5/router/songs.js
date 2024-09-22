const express = require('express');
const router = express.Router();
const songController = require('../controller/songContoller');

router.get('/', songController.Song);


module.exports = router;
