const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./router/route')

const app = express()



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routes); 
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})