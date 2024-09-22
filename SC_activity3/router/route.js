const express = require('express');
const router = express.Router();

const {
    index,
    secondpage,
    thirdpage,
    fourthpage,
    fifthpage,
} = require('../controller/view');


router.get('/', index); 
router.get('/page2', secondpage);
router.get('/page3', thirdpage);
router.get('/page4', fourthpage);
router.get('/page5', fifthpage);


module.exports = router;