var express = require('express');
var router = express.Router({mergeParams: true});
var authenticate = require('authenticate');
var passport = require('passport');

var Vehicle = require('models/vehicle');

/* GET vehicles listing. */
router.get('/',passport.authenticate('jwt',{ session: false }),function(req, res, next) {
  Vehicle.find(function(error, vehicles){
    res.send(vehicles);
  })
});

/* GET vehicles listing. */
router.post('/', function(req, res, next) {
  var vehicle = new Vehicle(req.params.vehicle);
  vehicle.save(function(error, vehicles){
    res.render(vehicle);
  })
});

module.exports = router;
