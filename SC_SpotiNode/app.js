const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/Route');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('js'));
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:5000');
})