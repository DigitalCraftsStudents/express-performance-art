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

app.use(logger);
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url} ${res.statusCode}`);
//     next();
// });

app.use('/', homeRouter);
// app.get('/', (req, res) => {
//     res.send(`<h1>Hello World!</h1>`);
// });

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
