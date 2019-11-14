function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var naziv = document.getElementsByName("naziv")[0];
    validacija.naziv(naziv);
    if(divPoruke.innerText != "") return false;
    return true;
}

function klik2() {
    var selectorVje = document.getElementsByName('sVjezbe')[1];
    var valueVje = selectorVje[selectorVje.selectedIndex].value;
    var selectorZad = document.getElementsByName('sZadatak')[0];
    var valueZad = selectorZad[selectorZad.selectedIndex].value;
    
    document.getElementsByName("fPoveziZadatak")[0].action += valueVje + '/zadatak';
}

window.onload = function() {
    var selGodine = document.getElementsByName('sGodine');
    var selVjezbe = document.getElementsByName('sVjezbe');
    prikaziGodine(selGodine);
    prikaziVjezbe(selVjezbe);
}

function pozoviAjax() {
    var selVjezbe = document.getElementsByName('sVjezbe')[1];
    var selZadatak = document.getElementsByName('sZadatak')[0];
    prikaziZadatke(selVjezbe, selZadatak);
}