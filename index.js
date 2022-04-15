const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const {urlencoded} = require('express');

const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie int he db
app.use(session({
    name: 'music',
    secret: 'any random',
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge: (100*60*1000)
    },

    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disbaled'
        },

        function(err){
            console.log(err || 'connect-mongodb set up ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use(customMware.getSongPlaying);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Error",err);
    }
    console.log("Server is running on the port",port);
});
