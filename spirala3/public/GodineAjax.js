var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                console.log('problem');
                var nizObjekata = JSON.parse(ajax.responseText);
                for(var i=0; i<nizObjekata.length -1; i++) {
                    var sadrzaj = '<div class="godina">' + 
                    '<h3> Naziv godine: ' + nizObjekata[i]['nazivGod'] + '</h3>' +
                    '<p class="bold">Naziv repozitorija vjezbe: ' + nizObjekata[i]['nazivRepVje'] + '</p>' +
                    '<p class="bold">Naziv repozitorija spirale: ' + nizObjekata[i]['nazivRepSpi'] + '</p>' +
                    '</div> ';
                    document.getElementById('divSadrzaj').innerHTML += sadrzaj;
                }
            }
        }
        ajax.open('GET', 'http://localhost:8080/godine', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
        return {
            osvjezi:function(){
                var novi = new XMLHttpRequest();
                novi.open('GET', 'http://localhost:8080/godine', true);
                novi.send();
            }
        }
    }
    return konstruktor;
}());
module.exports=GodineAjax;