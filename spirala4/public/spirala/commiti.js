var mojDiv;
var tabela;
function klikTabela() {
    var brojZadataka = document.getElementById("brojZadataka").value;
    if(brojZadataka < 0) {
        document.getElementById("divPoruke").innerHTML = "Broj zadataka mora biti broj veći od nule";
    }
    else {
        mojDiv = document.getElementById("glavni");
        tabela = new CommitTabela(mojDiv, parseInt(brojZadataka));
    }
}
function klikDodajCommit() {
    var rbZadatka = document.getElementsByName("rb")[0].value;
    var url = document.getElementsByName("urlCommita")[0].value;
    if(rbZadatka < 0) {
        document.getElementById("divPoruke").innerHTML = "Broj zadatka mora biti broj veći od nule";
    }
    else {
        tabela.dodajCommit(parseInt(rbZadatka), url);
    }
}
function klikEditujCommit() {
    var rbZadatka = document.getElementsByName("rb")[1].value;
    var rbCommita = document.getElementsByName("rb")[2].value;
    var url = document.getElementsByName("urlCommita")[1].value;
    var i = tabela.editujCommit(parseInt(rbZadatka), parseInt(rbCommita), url);
    if(i === -1) {
        document.getElementById("divPoruke").innerHTML = "Neispravni parametri";
    }
}   
function klikObrisi() {
    var rbZadatka = document.getElementsByName("rb")[3].value;
    var rbCommita = document.getElementsByName("rb")[4].value;
    var i = tabela.obrisiCommit(parseInt(rbZadatka), parseInt(rbCommita));
    if(i === -1) {
        document.getElementById("divPoruke").innerHTML = "Neispravni parametri";
    }
}

//Primjer koristenja: 
/*
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");

tabela.obrisiCommit(0, 1);
tabela.dodajCommit(0, "ehehhe");
tabela.dodajCommit(0, "ehehhe");
tabela.dodajCommit(0, "ehehhe");
tabela.obrisiCommit(0, 1);
tabela.dodajCommit(0, "ehehhe");
tabela.dodajCommit(0, "ehehhe");
tabela.dodajCommit(0, "ehehhe");
var tabela= new CommitTabela(mojDiv,2);


tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");

tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(3, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");
tabela.dodajCommit(1, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");
tabela.dodajCommit(2, "etf.unsa.ba");
tabela.dodajCommit(3, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(0, "etf.unsa.ba");
tabela.dodajCommit(3, "etf.unsa.ba");

//testni slucaj 1 - brise se commit iz reda sa najvise kolona

tabela.obrisiCommit(0, 0); //Prva kolona OK
tabela.obrisiCommit(0,4); // OK zadnja kolona ostane spanovana na 2 polja debugger;
tabela.obrisiCommit(0,0); // OK

//testni slucaj 3
tabela.obrisiCommit(3, 0); // ok
tabela.obrisiCommit(3, 2); //ok

//testni slucaj 2
tabela.obrisiCommit(1,0); // ok
tabela.obrisiCommit(1,5); // OK
tabela.obrisiCommit(1,3); //OK
//testni slucaj 4
tabela.obrisiCommit(3, 3) //ok
tabela.obrisiCommit(0,12); //ok
//testni slucaj 5 OK 
tabela.editujCommit(0,0, "https://www.facebook.com/");
tabela.editujCommit(3,1, "https://www.facebook.com/"); */