const homeHandler = (req, res) => {
    //res.send(`<h1>Hello World from Controller with custom logger!</h1>`);
    res.render('homepage');
};

module.exports = {
    homeHandler
};