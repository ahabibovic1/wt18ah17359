function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var godina = document.getElementsByName("nazivGod")[0];
    validacija.godina(godina);
    var rVjezbe = document.getElementsByName("nazivRepVje")[0];
    validacija.repozitorij(rVjezbe, /\w/);
    var rSpirale = document.getElementsByName("nazivRepSpi")[0];
    validacija.repozitorij(rSpirale, /\w/);
    if(divPoruke.innerText != "") return false;
    return true;
}