const content = require('../models/content');

exports.content_get = (req, res, next) => {
    let url = req.url.substr(1);
    if (url == '') url = 'home';
    content.findOne({page: url}, (error, result) => {
        if (error) throw new Error(error);
        res.render('content', {
            content: result
        })
    })
}

exports.not_found_get = (req, res) => {
    res.status(404).render('404');
}