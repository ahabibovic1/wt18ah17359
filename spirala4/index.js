//#region SPIRALA 3
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
//#endregion

//#region SPIRALA 4

const db = require('./db.js');
db.sequelize.sync();

//#endregion

//#region Zadatak 1
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
//#endregion

//#region Zadatak 2
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
            var objekat = { naziv: nazivForma, postavka:'http://localhost:8080/' + nazivForma + '.pdf' }; //json fajl zadatka
            
            db.zadatak.findOne({
                where: {
                  naziv: nazivForma
                }
              }).then( function(result) {
                    if(result == null) {
                        //upis u bazu
                        db.zadatak.create({ naziv: nazivForma, postavka:'http://localhost:8080/' + nazivForma + '.pdf' });
                        //spasi json fajl?
                        /*
                        var putanjaFolder = __dirname + '/public/uploads';
                        var putanjaZadatak = putanjaFolder + '/' + nazivForma + 'Zad.json';
                        fs.writeFile(putanjaZadatak, JSON.stringify(objekat), function(err) {
                            if(err) {
                                console.log(err);
                                res.render('greska', {greska:{poruka: err, linkNazad: ''}});
                                return;
                            }
                            else { 
                                console.log('Spasen json fajl');
                            }
                        });
                        */
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(objekat));
                    }
                    else {
                        //greska - postoji fajl sa istim nazivom
                        console.log('Greska! Postoji fajl sa istim nazivom');
                        res.render('greska', {greska:{poruka: 'Greska! Postoji fajl sa istim nazivom', linkNazad: 'http://localhost:8080/addZadatak.html'}});
                    }
              }).catch(function(err) { // u slucaju bilo koje druge greske
                  console.log(err);
                  res.render('greska', {greska:{poruka: 'Greska! ' + err, linkNazad: 'http://localhost:8080/addZadatak.html'}});
              });
        }
    });
});
//#endregion

//#region Zadatak 3
app.get('/zadatak', function(req, res) {
    var nazivZadatka = req.query.naziv;
    db.zadatak.findOne( { 
        where: { naziv: nazivZadatka} 
    }).then(function(result) {
        if(result == null) {
            console.log('Ne postoji zadatak');
            res.setHeader('Content-Type', 'application/json');
            res.send('Ne postoji zadatak');
        }
        else {
            console.log('Prikazan zadatak');
            res.redirect(result.postavka);
        }
    }).catch(function(err) { // u slucaju bilo koje druge greske
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send('Greska! ' + err);
    });
});
//#endregion

//#region Zadatak 4
app.post('/addGodina', function(req, res) {
    let tijelo = req.body;
    db.godina.findOne( {
        where: {nazivGod: tijelo['nazivGod']}
    }).then(function(result) {
        if(result == null) {
            db.godina.create({nazivGod: tijelo['nazivGod'], nazivRepSpi: tijelo['nazivRepSpi'], nazivRepVje: tijelo['nazivRepVje']});
            console.log('Dodani podaci sa forme');
            res.redirect('addGodina.html');
        }
        else {
            console.log('Greska! Godina vec postoji');
            res.render('greska', {greska:{poruka: 'Greska! Godina vec postoji', linkNazad: 'http://localhost:8080/addGodina.html'}});
        }
    }).catch(function(err) { // u slucaju bilo koje druge greske
        console.log(err);
        res.render('greska', {greska:{poruka: 'Greska! ' + err, linkNazad: 'http://localhost:8080/addGodina.html'}});
    });
});
//#endregion

//#region Zadatak 5
app.get('/godine', function(req, res) {
    db.godina.findAll().then(function(nizGodina) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nizGodina));
      }).catch(function(err){ // u slucaju bilo koje druge greske
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send('Greska! '+ err);
      });
});
//#endregion

//#region Zadatak 7
app.get('/zadaci', function(req, res) {
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

    db.zadatak.findAll().then(function(data) {
        var nizJson = JSON.parse(JSON.stringify(data))
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
    }).catch(function(err) { // u slucaju bilo koje druge greske
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send('Greska! ' + err);
    });
});
//#endregion

//#region Spirala 4 Zadatak 2a-2b
app.post('/addVjezba', function(req, res) {
    var idGod = req.body.sGodine;
    var idPostojeceVje = req.body.sVjezbe;
    var nazivNoveVje = req.body.naziv;
    var boolSpi = Boolean(req.body.spirala);

    if (typeof nazivNoveVje === 'undefined') {
        //fPostojeca
        var godPromise = db.godina.findById(idGod);
        var vjePromise = db.vjezba.findById(idPostojeceVje);

        godPromise.then(function (g) {
            vjePromise.then( function(v) {
                g.addVjezbe(v).catch(function(err) { console.log(err)});;
                });
            res.redirect('addVjezba.html');
            }).catch(function(err){ // u slucaju bilo koje druge greske
                console.log(err);
                res.render('greska', {greska:{poruka: 'Greska! ' + err, linkNazad: 'http://localhost:8080/addVjezba.html'}});
          });
    }
    else {
        //fNova
        db.vjezba.create( {
            naziv: nazivNoveVje, spirala: boolSpi
        }).then(function() {
            var godPromise = db.godina.findById(idGod);
            var vjePromise = db.vjezba.findOne({where: {naziv: nazivNoveVje}});
            godPromise.then(function (g) {
                vjePromise.then( function(v) {
                    g.addVjezbe(v);
                });
            });
            res.redirect('addVjezba.html');
        }).catch(function(err){ 
            console.log(err);
            res.render('greska', {greska:{poruka: 'Greska! Postoji vjezba sa istim nazivom', linkNazad: 'http://localhost:8080/addVjezba.html'}});
      });
    }
});
//#endregion

//#region Spirala 4 Zadatak 2c
app.post('/vjezba/:idVjezbe/zadatak', function(req, res) {
    var idZad = req.body.sZadatak;
    var idVjezbeLok = req.params.idVjezbe;

    var vjePromise = db.vjezba.findById(idVjezbeLok);
    var zadPromise = db.zadatak.findById(idZad);
    vjePromise.then(function (v) {
        zadPromise.then( function(z) {
            v.addZadaci(z);
        });
        res.redirect('http://localhost:8080/addVjezba.html');
    }).catch(function(err){ // u slucaju bilo koje druge greske
    console.log(err);
    res.render('greska', {greska:{poruka: 'Greska! ' + err, linkNazad: 'http://localhost:8080/addVjezba.html'}});
    });
});
//#endregion

//#region GET za prikaziVjezbe()
app.get('/vjezbe', function(req, res) {
    db.vjezba.findAll().then(function(nizVje) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(nizVje));
      }).catch(function(err){ // u slucaju bilo koje druge greske
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify());
      });
});
//#endregion

//#region GET za prikaziZadatke()
app.get('/vjezba/:idVjezbe', function(req, res) {
    var idPostojeceVje = req.params.idVjezbe;
    var vjePromise = db.vjezba.findById(idPostojeceVje); //odabrana vjezba
    var zadPromise = db.zadatak.findAll(); //svi zadaci

    vjePromise.then(function(v) {
        zadPromise.then(function(nizZadataka) {
            v.getZadaci().then(function(povezaniZadaci) {
                var temp = [];
                for(var i=0; i<nizZadataka.length; i++) {
                    var nijePovezan = true;
                    for(var j=0; j<povezaniZadaci.length; j++) {
                        if(nizZadataka[i].id == povezaniZadaci[j].id) {
                            nijePovezan = false;
                        }
                    }
                    if(nijePovezan)
                        temp.push(nizZadataka[i]);
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(temp));
            })
        })
    }).catch(function(err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify());
    });
    
});
//#endregion

app.listen(8080);