function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var godina = document.getElementsByName("naziv")[0];
    validacija.godina(godina);
    var rVjezbe = document.getElementsByName("rvjezbe")[0];
    validacija.repozitorij(rVjezbe, /\w/);
    var rSpirale = document.getElementsByName("rspiral")[0];
    validacija.repozitorij(rSpirale, /\w/);
}