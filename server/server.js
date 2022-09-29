// heroku: https://arcane-scrubland-59947.herokuapp.com/

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function() {
    console.log(`Now listening on ${PORT}`);
});