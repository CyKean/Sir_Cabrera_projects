const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./router/route')

const app = express()



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/',routes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})