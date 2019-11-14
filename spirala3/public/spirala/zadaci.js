function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var ime = document.getElementsByName("query")[0];
    validacija.ime(ime);
}