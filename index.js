var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const fs = require("fs"); // file system

app.use(fileupload());

app.get('/', function (req, res) {
    res.render(__dirname+'/views/form.pug');
});

//view engine
app.set('view engine', 'pug');
app.set('views', './views');

// parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    if(req.files)
        console.log(req.files);
    var file=req.files.file;
    var filename=file.name;
    console.log(filename);

    file.mv('./files/'+ filename, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send("File " +file.name+" has been uploaded");
        }
    });

    console.log(req.body);
    // res.send("Form Submitted Successfully");
});

app.listen(5797);
console.log("Server started!");
