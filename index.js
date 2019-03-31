if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express'),
app = express(),
mustacheExpress = require('mustache-express'),
db = require('./src/db'),
port = process.env.PORT || 3000,
passport = require('passport'),
session = require('express-session'),
expressValidator = require('express-validator'),
MongoStore = require('connect-mongo')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(express.static(__dirname + '/public'));

const sessionOptions = {
    store: new MongoStore({ mongooseConnection: db}),
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production'
    }
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));
app.use('/', require('./routes/users'));
app.use('/admin', require('./routes/admin'));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

try {
    app.listen(port, () => console.log(`app.js listening on port ${port}!`));
}
catch (error) {
    console.log(error);
}

passport.serializeUser(function (userid, done) {
    done(null, userid);
});

passport.deserializeUser(function (userid, done) {
    done(null, userid);
});

app.use((req, res, next) =>  {
    res.redirect('/404');
});