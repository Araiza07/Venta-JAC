var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    NombreP:{type:String},
	Precio:{type:Number},
    QR:{type:String}
});

module.exports = mongoose.model('Producto', ProductoSchema);