const http = require('http');
const express = require('express');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');


const app = express();
const server = http.createServer(app);
const logger = morgan('dev');

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = 3000;
const homeRouter = require('./routers/homeRouter');
const data = require('./data.json');
app.use(logger);
app.use('/', homeRouter);

// my goal is to render the data (from data.json)
// to a template
app.get('/movies', (req, res) => {
    // res.send(data);
    console.log(data);
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

    res.render('movieList', {
        locals: {
            movies: data
        }
    });
});

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
