const http = require('http');
const express = require('express');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');

const app = express();
const server = http.createServer(app);
const logger = morgan('dev');

app.use(express.urlencoded({ extended: true }));
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = 3000;

const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore(),  // no options for now
    secret: 'asdfasdfasdfsafsafsafdasdfasdf3',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


const router = require('./routers');
const { User } = require('./models');
const bcrypt = require('bcryptjs');
// const data = require('./data.json');
app.use(logger);
app.use(router);

// create a user - they fill out a form
app.get('/create', (req, res) => {
    res.send(`
<form method="POST">
  <input type="text" name="username" autofocus placeholder="username">
  <br>
  <input type="password" name="password">
  <br>
  <input type="submit" value="Create User">
</form>    
    `);
});
app.post('/create', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const hash = bcrypt.hashSync(password, 10); // auto salt!
    try {
        const newUser = await User.create({
            username,
            hash
        });
        console.log(newUser);
    
        res.send('user created');
    } catch (e) {
        res.send('username is taken');
    }
})

// log in a user - they fill out a form
app.get('/login', (req, res) => {
    res.send(`
<form method="POST">
  <input type="text" name="username" autofocus placeholder="username">
  <br>
  <input type="password" name="password">
  <br>
  <input type="submit" value="log in">
</form>    
    `);
});

app.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    // I need to check the database!
    // Is that a valid user?
    const user = await User.findOne({
        where: {
            username
        }
    });
    if (user) {
        // Is that their password?
        //res.send('we have a user!');
        const isValid = bcrypt.compareSync(password, user.hash);
        if (isValid) {

            req.session.user = {
                username: user.username,
                // username
                id: user.id
                // id
            };
            req.session.save(() => {
                res.send('that is totally right!');
            });

        } else {
            res.send('boooo wrong password!');
        }

    } else {
        res.send('No user with that name!');
    }
});



const isLoggedIn = (req, res, next) => {
    console.log('IN THE ISLOGGEDIN FUNCTIONnnnsnnnn');
    if (req.session.user) {
        next();
    } else {
        res.send('<h1>no soup for you</h1>');
    }    
};

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('LOGOUT!');
        // after deleting the session...
        res.redirect('/login');
    });
});

app.use(isLoggedIn);

// show them that they're logged in 
app.get('/restricted', (req, res) => {
    res.send(`
<h1>Welcome!</h1>
<form method="POST" action="/logout">
    <input type="submit" value="logout">
</form>
`);
});

app.get('/also-restricted', (req, res) => {
    res.send('jackpot');
});

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});


// const homeRouter = require('./routers/homeRouter');
// const movieRouter = require('./routers/movieRouter');
// const {
//     homeRouter,
//     movieRouter
// } = require('./routers');
// app.use('/films', router);
// my goal is to render the data (from data.json)
// to a template
// app.get('/movies', (req, res) => {
//     // res.send(data);
//     console.log(data);

//     res.render('movieList', {
//         locals: {
//             movies: data
//         }
//     });
// });
    // previously, this was in my `app.get('/movies')` handler:
    // const movieHtmlArray = [];
    // for (let d of data) {
    //     movieHtmlArray.push(`<p>${d.title}</p>`);
    // }
    // ---
    // .map() is a loop that creates a new array
    // and fills it with a "transformed" version
    // of each element.
    // const movieHtmlArray = data.map(d => `<p>${d.title}!!</p>`);
    // const movieHtmlString = movieHtmlArray.join('');
    // --- previous two lines can be combined:
    // const movieHtmlString = data.map(d => `<p>!!${d.title}!!</p>`).join('');
    // console.log(movieHtmlString);


