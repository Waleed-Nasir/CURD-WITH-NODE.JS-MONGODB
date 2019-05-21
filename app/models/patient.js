var mongoose = require('mongoose');
var schema = mongoose.Schema;

var patientSchema = new schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('patient', patientSchema);