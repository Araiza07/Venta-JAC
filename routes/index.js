const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const controllerQR = require('../controllers/scannController');
const authentication = require("../middleware/authentication");
/* GET home page. */
router.get('/home', authentication, function(req, res, next) {
  res.render('index', { title: 'Punto de Venta JAC',usuario:req.session.usuario});
});



router.get("/salir",controller.user_logout);

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Punto de Venta JAC', layout:false});
});

router.get('/registrarusuario', function(req, res, next) {
  res.render('registrar', { title: 'Punto de Venta JAC', layout:false});
});

router.post('/registrarusuario', controller.registraruser);


router.post("/verificar", controller.verificar);




/* GET registro page.*/
router.get('/crear', function(req, res){
  res.render('crear', {title: 'Crear'});
})

/* GET  recuperar page */
router.get('/precio', function(req, res){
  res.render('precio',{title: 'Colocar Precio'});
})

/* GET  actualizar page */
router.get('/actualizar', controller.actuali_producto)

router.get("/actualizar/:id",controller.actualizaproducto);
  
router.post("/actualizarproducto/:id", controller.actualizarproductopost);

router.get("/eliminar/:id", controller.eliminarproducto);


/* GET consulta page */
router.get('/consulta', function(req, res){
  res.render('consulta', {title: 'Consultar'});
})

/* GET leerQR page */ 
router.get('/leerqr',function(req, res){
  res.render('leerQR',{title: 'Leer QR'  });
 //res.send('Lectura de codigo QR')
});

router.get('/logout', controller.user_logout);
router.post('/index', controller.user_register); 
router.post('/register', controller.user_register); 
router.post('/code', controllerQR.verifyCode);

router.get('/register', function(req, res, next){
  let data = {
      title: 'Registrar Usuario',
      layout:false
    }

  res.render('register', data);
});
 
module.exports = router;