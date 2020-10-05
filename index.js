var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.port || 5000;
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://hadi:hadi1234@curd-api-agove.mongodb.net/Curd-data?retryWrites=true",{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false},(err)=>{
    console.log(err)
});

var Patient = require('./app/models/patient');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log("requesting something using router");
    next();
})

router.get('/', function (req, res) {
    res.json({ response: 'Hello World! welcome to aheer API, naveedaheer.com' });
});

router.route('/patients')
    .post(function (req, res) {
        var patient = new Patient();
        patient.name = req.body.name;
        patient.age = req.body.age

        patient.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ response: 'Patient Added Successfully' });
        });
    })
    .get(function (req, res) {
        Patient.find(function (err, patients) {
            if (err) {
                res.send(err)
            }
            res.json(patients);
        });
    });


router.route('/patients/:patientId')
    .get(function (req, res) {
        Patient.findById(req.params.patientId, function (err, patient) {
            if (err) {
                res.send(err);
            }
            res.json(patient);
        });
    })
    .put(function (req, res) {
        Patient.findById(req.params.patientId, function (err, patient) {
            if (err) {
                res.send(err);
            }
            patient.age = req.body.age;

            patient.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ response: 'Patient Updated' });
            });
        });
    })
    .delete(function (req, res) {
        Patient.remove({
            _id: req.params.patientId
        }, function (err, patient) {
            if (err) {
                res.send(err);
            }
            res.json({ response: 'Deleted Successfully' });
        });
    });

app.use('/api', router);
app.listen(port);
console.log('Server is running on port : ' + port);
