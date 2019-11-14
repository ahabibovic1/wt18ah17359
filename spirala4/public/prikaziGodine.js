var prikaziGodine = (function(){
    var konstruktor = function(sGodine){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var nizObjekata = JSON.parse(ajax.responseText);
                var postojecaGod = sGodine;
                for(var i=0; i<nizObjekata.length; i++) {
                    postojecaGod[0].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['nazivGod'] + '</option>';
                    postojecaGod[1].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['nazivGod'] + '</option>';
                }
            }
        }
        ajax.open('GET', 'http://localhost:8080/godine', true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
        return {
            osvjezi:function(){
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var nizObjekata = JSON.parse(ajax.responseText);
                        var postojecaGod = sGodine;
                        for(var i=0; i<nizObjekata.length; i++) {
                            postojecaGod[0].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['nazivGod'] + '</option>';
                            postojecaGod[1].innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['nazivGod'] + '</option>';
                        }
                    }
                }
                ajax.open('GET', 'http://localhost:8080/godine', true);
                ajax.setRequestHeader('Content-Type','application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());