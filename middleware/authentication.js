const Usuario = require('../models/User');


module.exports = (req, res, next) => {
    console.log('Verificando Inicio de Sesión', req.session.usuario);
    const user = req.session.usuario;
        Usuario.find({Usuario:user}, (error, user) => {
            console.log(user);
            if (error || user.length == 0 )
                return res.redirect('/')
            next()
        })
};