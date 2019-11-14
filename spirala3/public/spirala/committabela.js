var CommitTabela=(function(){ 
    function maxBrKolona(tabela){
        var brKolona = 0;
        for(var i=0; i<tabela.rows.length; i++) {
          if(brKolona < tabela.rows[i].cells.length)
            brKolona = tabela.rows[i].cells.length;
        }
        return brKolona; 
    }
    var konstruktor=function(divElement,brojZadataka){
        while (divElement.firstChild) 
            divElement.removeChild(divElement.firstChild);
        var tabela = document.createElement("table");
        var tbody = document.createElement("tbody");
        for(var i=0; i < brojZadataka+1; i++) {
            var red = document.createElement("tr");
            var kolona = document.createElement("td");
            var prvaKolona = document.createElement("td");
            red.appendChild(kolona);
            red.appendChild(prvaKolona);
            if(i === 0) {
                kolona.innerHTML = "Zadaci"
                prvaKolona.innerHTML = "Commiti";
            }
            else 
                kolona.innerHTML="Zadatak " + i.toString();
            tbody.appendChild(red);
        }
        tabela.appendChild(tbody);
        divElement.appendChild(tabela);
        return{
            dodajCommit:function(rbZadatka,url){
                rbZadatka = rbZadatka+1;
                var red = tabela.rows[rbZadatka];
                var brKolona = tabela.rows[rbZadatka].cells.length; //broj kolona reda
                var novaKolona = tabela.rows[rbZadatka].lastChild; //posljednja kolona u redu
                var nka = document.createElement("a"); //dodavanje <a> elementa
                nka.setAttribute("href", url);
                //1. SLUČAJ
                if(brKolona === maxBrKolona(tabela) && novaKolona.innerHTML != "") {
                    nka.innerText = parseInt(red.lastChild.innerText) + 1;
                    novaKolona = red.insertCell(brKolona);
                    novaKolona.appendChild(nka);
                    //Popravljanje ostalih redova
                    for(var i=0; i<tabela.rows.length; i++) {
                        var indeksZadnje = tabela.rows[i].cells.length - 1;
                        var zadnjaKolona = tabela.rows[i].cells[indeksZadnje];
                        var stariColspan = zadnjaKolona.colSpan;
                        if((zadnjaKolona.innerHTML == "" && indeksZadnje+1 != maxBrKolona(tabela)) || (i == 0))
                            zadnjaKolona.colSpan = (stariColspan + 1).toString();
                        else if(zadnjaKolona.innerHTML != "" && indeksZadnje+1 != maxBrKolona(tabela))
                            novaKolona = tabela.rows[i].insertCell(indeksZadnje+1);
                    }
                }
                //2. SLUČAJ
                else {
                    if(novaKolona.innerHTML != "") {
                        novaKolona = red.insertCell(brKolona);
                        brKolona += 1;
                    }
                    nka.innerText = brKolona - 1;
                    novaKolona.appendChild(nka);
                    var indeksZadnje = red.cells.length - 1;
                    if(indeksZadnje != maxBrKolona(tabela)-1) {
                        indeksZadnje += 1;
                        red.insertCell(indeksZadnje);
                        var clsp = maxBrKolona(tabela) - indeksZadnje;
                        red.cells[indeksZadnje].colSpan = clsp.toString();
                    }
                    for(var i=0; i<indeksZadnje; i++) 
                        red.cells[i].setAttribute("colspan", "1");
                }
            },
            editujCommit:function(rbZadatka,rbCommita,url){
                if((rbZadatka < 0 || rbZadatka > tabela.rows.length - 2) 
                || (rbCommita < 0 || rbCommita > maxBrKolona(tabela) - 2)
                || tabela.rows[rbZadatka+1].cells[rbCommita+1] == null
                || tabela.rows[rbZadatka+1].cells[rbCommita+1].innerHTML == "") {
                    return -1;
                }
                rbZadatka += 1;
                rbCommita += 1;
                tabela.rows[rbZadatka].cells[rbCommita].firstChild.href = url;
            },
            obrisiCommit:function(rbZadatka,rbCommita){
                if((rbZadatka < 0 || rbZadatka > tabela.rows.length - 2) 
                || (rbCommita < 0 || rbCommita > maxBrKolona(tabela) - 2)
                || tabela.rows[rbZadatka+1].cells[rbCommita+1] == null
                || tabela.rows[rbZadatka+1].cells[rbCommita+1].innerHTML == "") {
                    return -1;
                }
                rbZadatka += 1;
                rbCommita += 1;
                var red = tabela.rows[rbZadatka];
                var brKolona = tabela.rows[rbZadatka].cells.length;
                var br = 0;
                for(var i=0; i<tabela.rows.length; i++)
                    if(tabela.rows[i].cells.length == maxBrKolona(tabela) && tabela.rows[i].lastChild.innerHTML != "")
                        br++;
                red.deleteCell(rbCommita);
                //brise se polje iz reda sa najvise commita
                if(brKolona == maxBrKolona(tabela) && br === 1 && red.lastChild.innerHTML!="") {
                    for(var i=0; i<tabela.rows.length; i++) {
                        var indeksZadnje = tabela.rows[i].cells.length - 1;
                        var zadnjaKolona = tabela.rows[i].cells[indeksZadnje];
                        var stariColspan = zadnjaKolona.colSpan;
                        if((zadnjaKolona.innerHTML == "" && stariColspan == "1"))
                            tabela.rows[i].deleteCell(indeksZadnje);
                        else if(zadnjaKolona.innerHTML == "")
                            zadnjaKolona.colSpan = (parseInt(stariColspan) +1).toString();
                        }
                }
                //ako postoji vise redova sa maxbr commita
                else if(brKolona == maxBrKolona(tabela) && red.lastChild.innerHTML!="") {
                    //red.lastChild.colSpan
                    red.insertCell(red.cells.length);
                }
                //sirenje praznog prostora
                else {
                    for(var i=0; i<tabela.rows.length; i++) {
                        var zadnjaKolona = tabela.rows[i].lastChild;
                        var stariColspan = zadnjaKolona.colSpan;
                        zadnjaKolona.colSpan = (parseInt(stariColspan) +1).toString();
                    }
                }
            }
        }
    }
    return konstruktor;
}());