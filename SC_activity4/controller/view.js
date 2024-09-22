const index = (req, res) =>{
    res.render('index');
}

const shop = (req, res) =>{
    res.render('shop');
}

const shopdetails = (req, res) =>{
    res.render('shop-details');
}

const contact = (req, res) =>{
    res.render('contact');
}


module.exports = {
    index,
    shop,
    shopdetails,
    contact,
}