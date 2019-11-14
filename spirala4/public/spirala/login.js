function klik() {
    var divPoruke=document.getElementById("divPoruke");
    var validacija = new Validacija(divPoruke);
    var password = document.getElementsByName("password")[0];
    validacija.password(password);
}