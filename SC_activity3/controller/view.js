const index = (req, res) =>{
    res.render('index');
}

const secondpage = (req, res) =>{
    res.render('2ndpage');
}

const thirdpage = (req, res) =>{
    res.render('3rdpage');
}

const fourthpage = (req, res) =>{
    res.render('4thpage');
}

const fifthpage = (req, res) =>{
    res.render('5thpage');
}

module.exports = {
    index,
    secondpage,
    thirdpage,
    fourthpage,
    fifthpage,
}