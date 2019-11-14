var ZadaciAjax = (function() {
    var konstruktor = function(callbackFn) {
        var ajax = new XMLHttpRequest();
        var odgovor = false;
        ajax.timeout = 2000; 
        ajax.onload = function () {
            callbackFn(ajax.response);
            odgovor = false;
        };
        ajax.ontimeout = function() {
            console.log('Odgovor nije stigao');
            odgovor = false;
        };
        return {
            dajXML: function() {
                if(odgovor) {
                    return callbackFn({greska: 'Vec ste uputili zahtjev'});
                }
                odgovor = true;
                ajax.open('GET', 'http://localhost:8080/zadaci', true);
                ajax.setRequestHeader('Accept', 'application/xml');
                ajax.send();
            },
            dajCSV: function() {
                if(odgovor) {
                    return callbackFn({greska: 'Vec ste uputili zahtjev'});
                }
                odgovor = true;
                ajax.open('GET', 'http://localhost:8080/zadaci', true);
                ajax.setRequestHeader('Accept', 'text/csv');
                ajax.send();
            },
            dajJSON: function() {
                if(odgovor) {
                    return callbackFn({greska: 'Vec ste uputili zahtjev'});
                }
                odgovor = true;
                ajax.open('GET', 'http://localhost:8080/zadaci', true);
                ajax.setRequestHeader('Accept', 'application/json');
                ajax.send();
            }
        }
    }
return konstruktor;
}());
module.exports=ZadaciAjax;