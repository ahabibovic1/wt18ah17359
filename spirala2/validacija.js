var Validacija=(function(){
//lokalne variable idu ovdje
    function napisiPoruku(divElementPoruke, naziv) {
        var pozicija = divElementPoruke.innerHTML.length -1;
        if(divElementPoruke.innerHTML != "") {
            if(divElementPoruke.innerHTML.search(naziv) == -1) {
                divElementPoruke.innerHTML = divElementPoruke.innerHTML.substr(0, pozicija) + "," + naziv + divElementPoruke.innerHTML.substr(pozicija);
            }
        }
        else {
            divElementPoruke.innerHTML += "Sljedeća polja nisu validna:" + naziv + "!";
        }
    }
    function obrisiPoruku(divElementPoruke, naziv) {
        divElementPoruke.innerHTML.replace(naziv, "");
    }
    var konstruktor=function(divElementPoruke){
        divElementPoruke.innerHTML= "";
        return{
            ime:function(inputElement){
                var greska = false;
                var s = inputElement.value;
                for(var i=0; i<s.length-1; i++) {
                    if(s[i] == "'" && s[i+1] == "'")
                        greska = true;
                }
                var regexIme = /^[A-Z][a-z]+([a-z]|'?)*((-|\ )[A-Z][a-z]+([a-z]|'?)*){0,3}$/;
                if(!regexIme.test(s)) {
                    greska = true;
                }
                if(greska == true) {
                    napisiPoruku(divElementPoruke, "ime");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "ime");
                    inputElement.style.backgroundColor = "white";
                }
            },
            godina:function(inputElement){
                var regexGod = /^20[0-9]{2}\/20[0-9]{2}$/;
                var s = inputElement.value;
                var prva = parseInt(s.substr(2,4))+1;
                var druga = parseInt(s.substr(7,9));
                if(!(regexGod.test(s) && prva == druga)) {
                    napisiPoruku(divElementPoruke, "godina");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "godina");
                    inputElement.style.backgroundColor = "white";
                }
            },
            repozitorij:function(inputElement,regex){
                var s = inputElement.value; 
                if(!regex.test(s)) {
                    napisiPoruku(divElementPoruke, "repozitorij");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "repozitorij");
                    inputElement.style.backgroundColor = "white";
                }
            },
            index:function(inputElement){
                var s = inputElement.value;
                var regexIndex = /^[1][4-9]\d{3}$/;
                if(!regexIndex.test(s)) {
                    napisiPoruku(divElementPoruke, "index");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "index");
                    inputElement.style.backgroundColor = "white";
                }
            },
            naziv:function(inputElement){
                var s = inputElement.value;
                var regexNaziva = /^([A-z]|[a-z])([0-9]|[a-z]|[A-z]|[\\/\-"'\!\?:;,])+([a-z]|[0-9])$/;
                if(!regexNaziva.test(s)) {
                    napisiPoruku(divElementPoruke, "naziv");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "naziv");
                    inputElement.style.backgroundColor = "white";
                }
            },
            password:function(inputElement){
                var s = inputElement.value;
                var regexPass = /^([a-z]+[0-9]+)|([a-z]+[A-Z]+)|([A-Z]+[a-z]+)|([A-Z]+[0-9]+)|([0-9]+[a-z]+)|([0-9]+[A-Z]+)$/;
                if(s.length < 8 || !regexPass.test(s)) {
                    napisiPoruku(divElementPoruke, "password");
                    inputElement.style.backgroundColor = "orangered";
                }
                else {
                    obrisiPoruku(divElementPoruke, "password");
                    inputElement.style.backgroundColor = "white";
                }
            },
            url:function(inputElement){
                
            }
        }
    }
    return konstruktor;
}());