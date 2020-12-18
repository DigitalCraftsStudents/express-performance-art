const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const homeRouter = require('./routers/home');

const PORT = 3000;

app.use('/', homeRouter);
// app.get('/', (req, res) => {
//     res.send(`<h1>Hello World!</h1>`);
// });

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
