const Producto = require("../models/Producto");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body,validationResult } = require('express-validator');


exports.user_login = function(req, res) {
    res.send('Despliega formulario login');
};

exports.user_register = ((req, res, next) => {
        console.log('Ingresando a la validación');
        const errors = validationResult(req);
        const data = req.body;
          let  NombreP=data.NombreP;
           let  Precio= data.PrecioProducto;

        if (!errors.isEmpty()) {
            let data = {
                title: 'Registro de Usuario',
                messages: errors.array()
            };
            res.render('registro', data);
            return;
        } else {
            console.log('Registrando Usuario');
            let producto = new Producto({
                NombreP:data.NombreP,
                Precio:data.PrecioProducto,
                QR:`https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=imagen.png&data={Producto:${NombreP},Precio:${Precio}}`
            });

            producto.save(function(error){
                if (error) { return next(error); }

                let data= {title: 'Ingresar Sistema', message:'Bienvenido ' + req.body.nombreE}
                res.redirect("/actualizar");
            });
        }
    });

exports.user_logout = function(req, res) {
    req.session.destroy();

    let data = {
        title: 'Ingresar al Sistema',
        layout:false
    }
    res.render('login', data);   

};

exports.actuali_producto = ((req, res)=>{
    Producto.find({},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");
        } else {
            
  res.render('actualizar',{title: 'Actualizar Producto',productos:result});
        }
    });
});

exports.actualizaproducto = ((req, res)=>{
    const params = req.params;
    const id = params.id;
    Producto.find({_id:id},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");    
        } else {
            res.render("actualizarproducto",{producto:result[0]});
        }
    });

})

exports.actualizarproductopost = ((req, res)=>{
    
    const params = req.params;
    const data = req.body;
    const id = params.id;
    let NombreP = data.NombreP;
    let Precio = data.Precio;
    Producto.updateOne({_id:id},{$set:{
        Precio:data.Precio,
        NombreP:data.NombreP,
        QR:`https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=imagen.png&data={Producto:${NombreP},Precio:${Precio}}`
    }},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");
        } else {
            res.redirect("/actualizar");
        }
    });
})

exports.eliminarproducto = ((req, res)=>{
    const params = req.params;
    const id = params.id;
    Producto.remove({_id:id},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");  
        } else {
            res.redirect("/actualizar");
        }
    });
})

exports.registraruser = ((req, res)=>{
    const data = req.body;
    let user = new User({
        Usuario:data.Usuario,
        Email:data.Email,
        Password:data.Password,
    });

    user.save((err, result)=>{
        if (err) {
            console.log("A ocurrido un error");  
        } else {
            res.redirect("/");
        }
    });
})


exports.verificar = ((req, res)=>{
    const data = req.body;
    User.find({Usuario:data.Usuario},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");  
        } else  if(result[0]){
                bcrypt.compare(data.Password, result[0].Password, (err, coinciden)=>{
                    if (coinciden && data.Usuario == result[0].Usuario) {
                        req.session.usuario = result[0].Usuario;
                        res.redirect("/home");
                    } else {
                        res.send("Usuario o contraseña incorrectas") 
                    }
                })
        }else{
            res.send("Usuario no encontrado")
        }
    });

    a = [1,23,4,]
    a.lenght
});


