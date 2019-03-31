const User = require('../models/user'),
bcrypt = require('bcrypt');

exports.create_get = (req, res) => {
    res.render('users/register', {
        title: 'Registreren'
    })
}

exports.create_post = (req, res) => {
    const {username, password, confirmpassword} = req.body;
    
    req.check('username', 'Ongeldige gebruikersnaam').isLength({min: 8, max: 30}).trim().escape();
    //creat contains special char ect
    req.check('password', 'Ongeldig wachtwoord').isLength({min: 8, max: 72}).equals(confirmpassword);
    
    const errors = req.validationErrors();
    if (errors) return res.render('users/register',{
        title: 'Registreren',
        errors,
        values: req.body
    })

    User.countDocuments({username}, (error, result) => {
        if (error) throw new Error(error); 
        if (result) return res.render('users/register',{
            title: 'Registreren',
            errors: [{msg: 'De gebruikersnaam bestaan al'}],
            values: req.body
        })
        else{
            bcrypt.hash(password, 12)
            .then(hashedPassword => {
                User.create({ username, password: hashedPassword }, (error) => {
                    if (error) return res.render('users/register',{
                        title: 'Registreren',
                        errors: error,
                        values: req.body
                    })
                    return res.render('users/register_succes');
                })
            })
        }
    });
}

exports.login_get = (req, res) => {
    res.render('users/login', {
        title: 'Login'
    })
}

exports.login_post = (req, res) => {
    const {username, password} = req.body;

    req.check('username').trim().escape();
    req.check('password').trim().escape();

    const errors = req.validationErrors();
    if (errors) return res.render('users/login',{
        title: 'Login',
        errors,
        values: req.body
    })

    
    User.findOne({username}, (error, result) => {
        if (error) throw new Error(error);

        comparePassword(password, result.password)
        .then(_ => {
            req.login(result._id, (error) => {
                if (error) return console.log(error);
                res.redirect('/admin')
            })
        })
        .catch(error => res.redirect('/login'))
    })
}

const comparePassword = (password, encryptedPassword) => new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
    })
})