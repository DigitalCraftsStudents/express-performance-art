const homeHandler = (req, res) => {
    res.send(`<h1>Hello World from Controller!</h1>`);
};

module.exports = {
    homeHandler
};