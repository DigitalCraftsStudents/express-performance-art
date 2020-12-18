const data = require('../data.json');

const movieHandler = (req, res) => {
    res.render('movieList', {
        locals: {
            movies: data
        }
    });
}
module.exports = {
    movieHandler
}