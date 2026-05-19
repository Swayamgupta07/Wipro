const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const studentRoutes = require('./route/studentRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/', studentRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
