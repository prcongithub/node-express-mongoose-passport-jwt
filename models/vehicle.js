var mongoose = require('db/mongoose');
var vehicleSchema = mongoose.Schema({
  name: String
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
