var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cors = require('cors');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

require('./config/passport')(passport);

var PORT = process.env.PORT || 8080;
var app = express();

mongoose.connect(configDB.url);

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser('devmarshalgonnadevtillhegoes'));
app.use(bodyParser());

const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(session({
    secret: 'devmarshalgonnadevtillhegoes',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: cookieExpirationDate // use expires instead of maxAge
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

var server = app.listen(PORT, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s...', host, port);
});