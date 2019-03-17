var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var multer = require('multer');
var app = express();
var port = 7000;
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/Login", function(err, db) {
    if (err) {
        console.log("unable to conect to database");
    } else {
        console.log("connected to database");

    }
});


var Schema = mongoose.Schema;
var ItemSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});
var Item = mongoose.model("photo", ItemSchema);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload')
    },
    filename: function(req, file, cb) {
        /*	if(file.mimetype=="text/plain"){
           cb(null,file.originalname;
		}else{*/
        cb(null, file.originalname);
        /*}*/

    }
});



var upload = multer({
    storage: storage
}).single('file');

app.post('/upload', function(req, res, ) {
    upload(req, res, function(err) {
        var newItem = new Item();
        newItem.img.data = fs.readFileSync(req.file.path);
        newItem.img.contentType = 'text/plain' || 'image/jpg';
        newItem.save();

        if (err) {
            console.log("error in uploading");

        } else {
            fs.readFile(req.file.path, "ascii", function(err, data) {
                data.split("\n\n").forEach(function(element) {
                    //console.log('input: \n' + element);
                    //console.log('output: \n'+get7segment(element))
                    var result = get7segment(element);
                    fs.appendFile('./upload/invoice.txt', 'Invoice: ' + result + " ", function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        //console.log("data append");
                        var file = './upload/invoice.txt'
                        if (result == 'end of file') {
                            res.download(file);
                        }

                        //res.sendFile(path.join(__dirname, './upload', 'invoice.txt'));
                    });
                });


            });
        }
    });



});

function get7segment(ascii) {
    if (ascii == "") {
        return "end of file";
    } else {
        return ascii.
        split('\n').
        reduce(function(r, a, i) {
            a.match(/.../g).forEach(function(b, j) {
                r[j] = r[j] || [];
                r[j][i] = b;
            });
            return r;
        }, []).
        map(function(a) {
            return a.join('');
        }).
        map(function(a) {
            var bits = {
                    63: 0,
                    6: 1,
                    91: 2,
                    79: 3,
                    102: 4,
                    109: 5,
                    125: 6,
                    7: 7,
                    127: 8,
                    111: 9,
                    0: ' '
                },
                v = '909561432'.split('').reduce(function(r, v, i) {
                    return r + ((a[i] !== ' ') << v);
                }, 0);
            return v in bits ? bits[v] : '*'; // * is an illegal character
        }).
        join('');
    }
}

app.listen(port, function() {
    console.log("listining to port" + port);
});