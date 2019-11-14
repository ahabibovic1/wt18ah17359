function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var naziv = document.getElementsByName("naziv")[0];
    validacija.naziv(naziv);
    if(divPoruke.innerText != "") return false;
    return true;
}