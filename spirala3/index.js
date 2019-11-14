const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('public/spirala'));

//Zadatak2 upload pdf fajla
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype != 'application/pdf') 
            cb(new Error('greska'))
        else 
            cb(null, __dirname + '/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.naziv + '.pdf')
    }
});
  
var upload = multer({ storage: storage })
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var jsonxml = require('jsontoxml');
var Json2csvParser = require('json2csv').Parser;

//Zadatak 1
app.get('/addGodina.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'addGodina.html');
});
app.get('/addStudent.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'addStudent.html');
});
app.get('/addVjezba.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'addVjezba.html');
});
app.get('/addZadatak.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'addZadatak.html');
});
app.get('/commiti.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'commiti.html');
});
app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'login.html');
});
app.get('/studenti.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'studenti.html');
});
app.get('/zadaci.html', function (req, res) {
    res.sendFile(__dirname + '/spirala/' + 'zadaci.html');
});

//Zadatak 2
app.post('/addZadatak', function(req, res) {
    upload.single('postavka')(req, res, function(err) {
        if(err) {
            //greska - tip fajla nije pdf
            console.log('Greska! Tip fajla nije pdf');
            res.render('greska', {greska:{poruka: 'Greska! Tip fajla nije pdf', linkNazad: 'http://localhost:8080/addZadatak.html'}});
        }
        else {
            console.log('Spasen pdf fajl');
            var nazivForma = req.body.naziv;
            var putanjaFolder = __dirname + '/public/uploads';
            var putanjaZadatak = putanjaFolder + '/' + nazivForma + 'Zad.json';
            fs.readFile(putanjaZadatak, function(err, data) {
                if(err) {
                    //kreiranje fajlova
                    var objekat = { naziv: nazivForma, postavka:'http://localhost:8080/' + nazivForma + '.pdf' };
                    fs.writeFile(putanjaZadatak, JSON.stringify(objekat), function(err) {
                        if(err) {
                            console.log(err);
                            res.render('greska', {greska:{poruka: err, linkNazad: ''}});
                            return;
                        }
                        else {
                            fs.appendFile(putanjaFolder + '/lista.txt', nazivForma + ',', function(err) {
                                if(err) {
                                    console.log(err);
                                    res.render('greska', {greska:{poruka: err, linkNazad: ''}});
                                    return;
                                }
                                else {
                                    console.log('Fajl upisan u listu');
                                }
                            });
                            console.log('Spasen json fajl');
                        }
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(objekat));
                }
                else {
                    //greska - postoji fajl sa istim nazivom
                    console.log('Greska! Postoji fajl sa istim nazivom');
                    res.render('greska', {greska:{poruka: 'Greska! Postoji fajl sa istim nazivom', linkNazad: 'http://localhost:8080/addZadatak.html'}});
                }
            });
        }
    });
});

//Zadatak 3
app.get('/zadatak', function(req, res) {
    res.sendFile(__dirname + '/public/uploads/' + req.query.naziv + '.pdf', function(err) {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.send();
        }
        else {
            console.log('Prikazan zadatak');
        }
    });
});

//Zadatak 4
app.post('/addGodina', function(req, res) {
    let tijelo = req.body;
    let novaLinija = tijelo['nazivGod'] + ',' + tijelo['nazivRepVje'] + ',' + tijelo['nazivRepSpi'] + '\n';
    fs.readFile(__dirname + '/public/uploads/godine.csv', function (err, content) {
        if(err) {
            console.log(err);
            res.render('greska', {greska:{poruka: err, linkNazad: 'http://localhost:8080/addGodina.html'}});
            return;
        }
        var str = content.toString();
        var red = str.split('\n');
        var postoji = false;
        for(var i=0; i<red.length; i++) {
            var kolona = red[i].split(',');
            if(kolona[0] == tijelo['nazivGod']) {
                postoji = true;
                break;
            }
        }
        if(postoji) {
            console.log('Greska! Godina vec postoji');
            res.render('greska', {greska:{poruka: 'Greska! Godina vec postoji', linkNazad: 'http://localhost:8080/addGodina.html'}});
        }
        else {
            fs.appendFile(__dirname + '/public/uploads/godine.csv', novaLinija, function(err) {
                if(err) {
                    console.log(err);
                    res.render('greska', {greska:{poruka: err, linkNazad: 'http://localhost:8080/addGodina.html'}});
                    return;
                }
                else {
                    console.log('Dodani podaci sa forme: ' + novaLinija);
                }
                res.redirect('addGodina.html');
            });
        }
    });
});

//Zadatak 5
app.get('/godine', function(req, res) {
    fs.readFile(__dirname + '/public/uploads/godine.csv', function (err, content) {
        if(err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify());
        }
        else {
            var str = content.toString();
            var red = str.split('\n');
            var nizObjekata = [];
            for(var i=0; i<red.length; i++) {
                var kolona = red[i].split(',');
                var objekat = {nazivGod:kolona[0],nazivRepVje:kolona[1],nazivRepSpi:kolona[2]};
                nizObjekata.push(objekat);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(nizObjekata));
        }
    });
});

//Zadatak 7
app.get('/zadaci', function(req, res) {
    var str = [];
    var str = fs.readFileSync(__dirname + '/public/uploads/lista.txt', 'utf8');
    str = str.toString().split(',');  //lista svih spasenih fajlova sa ekstenzijom
    str = str.slice(0, -1); //zbog zadnjeg zareza prilikom upisa u listu spasenih fajlova
    var nizFormata = req.headers.accept.split(', '); 
    var imaCsv = false, imaXml = false, imaJson = false;
    var xmlheader = "";
    for(var i=0; i<nizFormata.length; i++) {
        if(nizFormata[i] == 'application/json') {
            imaJson = true;
        }
        else if(nizFormata[i] == 'text/xml' || nizFormata[i] == 'application/xml') {
            imaXml = true;
            xmlheader = nizFormata[i];
        }
        else if(nizFormata[i] == 'text/csv') {
            imaCsv = true;
        }
    }
    var nizJson = [];
    for(var i=0; i<str.length; i++) {
        var bafer = fs.readFileSync(__dirname + '/public/uploads/' + str[i] + 'Zad.json');
        var objekat = JSON.parse(bafer);
        nizJson.push(objekat);
    }
    if(imaJson) {
        //posalji json
        console.log('Poslan json');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nizJson));
    }
    else if(imaXml) {
        //posalji xml
        var xmlString = jsonxml(nizJson, true).toString().split('>')[0] + '>' + '<zadaci>\n';
        for(var i=0; i<nizJson.length; i++) {
            xmlString += '<zadatak>\n' + jsonxml(nizJson[i]) + '</zadatak>\n';
        }
        xmlString += '</zadaci>'
        console.log('Poslan xml');
        res.setHeader('Content-Type', xmlheader);
        res.send(xmlString);
    }
    else if(imaCsv) {
        //posalji csv
        var parser = new Json2csvParser({ header: false, quote: '' });
        var csvString = parser.parse(nizJson);
        console.log('Poslan csv');
        res.setHeader('Content-Type', 'text/csv');
        res.send(csvString);
    }
    else {
        console.log("Nijedan od navedenih formata")
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nizJson));
    }
});

app.listen(8080);