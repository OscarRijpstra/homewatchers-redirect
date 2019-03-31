const adminItem = require('../models/adminitem'),
content = require('../models/content');

exports.dashboard_get = (req, res) => {
    adminItem.find((error, result) => {
        if (error) throw new Error(error);
        res.render('admin/dashboard', {
            title: 'Dashboard',
            items: result
        });
    })
}

exports.content_get = (req, res) => {
    const page = req.params.url;
    content.findOne({page}, (error, result) => {
        if (error) throw new Error(error);
        if (!result) return res.redirect('/admin');
        res.render('admin/content', {
            content: result
        });
    })
}