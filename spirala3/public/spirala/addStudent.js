function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var ime = document.getElementsByName("ime")[0];
    validacija.ime(ime);
    var index = document.getElementsByName("index")[0];
    validacija.index(index);
}