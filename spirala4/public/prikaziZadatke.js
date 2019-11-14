var prikaziZadatke = (function(){
    var konstruktor = function(sVjezbe, sZadatak){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var nizObjekata = JSON.parse(ajax.responseText);
                var postojeciZad = sZadatak;
                postojeciZad.innerHTML = "<option disabled selected value> -- Odaberite zadatak -- </option>";
                for(var i=0; i<nizObjekata.length; i++) {
                    postojeciZad.innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                }
            }
        }
        var selector = sVjezbe;
        var value = selector[selector.selectedIndex].value;
        ajax.open('GET', 'http://localhost:8080/vjezba/' + value, true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
        return {
            osvjezi:function(){
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var nizObjekata = JSON.parse(ajax.responseText);
                        var postojeciZad = sZadatak;
                        for(var i=0; i<nizObjekata.length; i++) {
                            postojeciZad.innerHTML += '<option value=' + nizObjekata[i]['id'] + '>' + nizObjekata[i]['naziv'] + '</option>';
                        }
                    }
                }
                var selector = sVjezbe;
                var value = selector[selector.selectedIndex].value;
                ajax.open('GET', 'http://localhost:8080/vjezba/' + value, true);
                ajax.setRequestHeader('Content-Type','application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());