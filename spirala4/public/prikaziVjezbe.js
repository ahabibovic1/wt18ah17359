var prikaziVjezbe = (function(){
    var konstruktor = function(sVjezbe){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var nizObjekata = JSON.parse(ajax.responseText);
                var postojecaVje = sVjezbe;
                for(var i=0; i<nizObjekata.length; i++) {
                    postojecaVje[0].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                    postojecaVje[1].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                }
            }
        }
        ajax.open('GET', 'http://localhost:8080/vjezbe', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
        return {
            osvjezi:function(){
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var nizObjekata = JSON.parse(ajax.responseText);
                        var postojecaVje = sVjezbe;
                        for(var i=0; i<nizObjekata.length; i++) {
                            postojecaVje[0].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                            postojecaVje[1].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                        }
                    }
                }
                ajax.open('GET', 'http://localhost:8080/vjezbe', true);
                ajax.setRequestHeader('Content-Type','application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());