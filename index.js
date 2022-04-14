const express = require('express');
const port = 8000;
const app = express();

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Error",err);
    }
    console.log("Server is running on the port",port);
});