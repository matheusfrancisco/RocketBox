const express = require('express');

const app = express();

mongoose.connect('url-mongodb-atlas', {
    userNewUrlParser: true
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(require('./routes.js'));


app.listen(3333);


