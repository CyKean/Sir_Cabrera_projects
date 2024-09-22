const express = require('express');
const router = express.Router();

const {
    index,
    shop,
    shopdetails,
    contact,
} = require('../controller/view');


router.get('/', index); 
router.get('/shop', shop);
router.get('/shop-detail', shopdetails);
router.get('/contact', contact);


module.exports = router;