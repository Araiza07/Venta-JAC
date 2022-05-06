const mongoose = require("mongoose");
const connection = mongoose.connect(`mongodb+srv://admin:loquesea123@cluster0.dsqht.mongodb.net/PuntoVentaJAC?retryWrites=true`)
.then((db)=>{
    console.log("Conexion exitosa a mongoDB");
}).catch((err)=>{
    console.log("Ah ocurrido un error: "+err.message);
})
module.exports = connection;