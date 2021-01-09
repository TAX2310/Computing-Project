const express = require ('express')
const bodyParser = require ('body-parser')
const session = require ('express-session')
const validator = require ('express-validator');
const flash = require('express-flash-notification');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
    expires: 600000
    }
}));

app.use(cookieParser());
app.use(expressSanitizer());
app.use(flash(app));

//main.js link
require('./routes/main')(app);
require('./routes/create_account.js')(app);
require('./routes/login.js')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`app listening on port ${port}!`))