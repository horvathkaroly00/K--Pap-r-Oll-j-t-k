var felPont = 0;
var szamPont = 0;
const felPont_span = document.getElementById("felhasznalopont");
const szamPont_span = document.getElementById("szamitogeppont");
const eredmenyJelzo_div = document.querySelector(".eremenyjelzo");
const eredmeny_p = document.querySelector(".eredmeny > p");
const ko_div = document.getElementById("ko");
const papir_div = document.getElementById("papir");
const ollo_div = document.getElementById("ollo");
const ujrainditas_div = document.getElementById('ujrainditas-div');
const ujrainditas_gomb = document.getElementById('ujrainditas');
const eredmeny_div = document.querySelector('.eredmeny');

function getSzamValasztas() {
    const valasztas = ['ko', 'papir', 'ollo'];
    const random = Math.floor(Math.random() * 3);
    return valasztas[random];
}

function wordConvert(szo) 
{
    if(szo === "ko") return "Kő";
    if(szo === "papir") return "Papír";
    return "Olló";
}

function win(felhValasztas, szamValasztas) 
{
    felPont++;
    felPont_span.innerHTML = felPont;
    szamPont_span.innerHTML = szamPont;
    eredmeny_p.innerHTML = wordConvert(felhValasztas) + " > " + wordConvert(szamValasztas) + ", nyertél!";
    document.getElementById(felhValasztas).classList.add('gyozelem');
    setTimeout(function() { document.getElementById(felhValasztas).classList.remove('gyozelem') }, 500);
}

function lose(felhValasztas, szamValasztas) 
{
    szamPont++;
    felPont_span.innerHTML = felPont;
    szamPont_span.innerHTML = szamPont;
    eredmeny_p.innerHTML = wordConvert(felhValasztas) + " < " + wordConvert(szamValasztas) + ", vesztettél!";
    document.getElementById(felhValasztas).classList.add('vereseg');
    setTimeout(function() { document.getElementById(felhValasztas).classList.remove('vereseg') }, 500);
}



function draw(felhValasztas, szamValasztas) 
{
    eredmeny_p.innerHTML = wordConvert(felhValasztas) + " = " + wordConvert(szamValasztas) + ", döntetlen!";
    document.getElementById(felhValasztas).classList.add('dontetlen');
    setTimeout(function() { document.getElementById(felhValasztas).classList.remove('dontetlen') }, 500);
}

function eredmenyEllenorzes() {
    if (felPont >= 3) {
        eredmeny_div.innerHTML = "A játékos nyert! Az újraindításhoz kattints az 'Újraindítás' gombra!";
        ujrainditas_div.classList.remove('elrejt');
        ujrainditas_div.classList.add('elohoz');
        ujrainditas_gomb.addEventListener('click', () => location.reload());
    } else if (szamPont >= 3) {
        eredmeny_div.innerHTML = "A számítógép nyert! Az újraindításhoz kattints az 'Újraindítás' gombra!";
        ujrainditas_div.classList.remove('elrejt');
        ujrainditas_div.classList.add('elohoz');
        ujrainditas_gomb.addEventListener('click', () => location.reload());
    }
}

setInterval(eredmenyEllenorzes, 100);

function game(felhValasztas) 
{
    const szamValasztas = getSzamValasztas();
    switch(felhValasztas + szamValasztas) 
    {
        case "koollo":
        case "papirko":
        case "ollopapir":
            win(felhValasztas, szamValasztas);
            break;
        case "kopapir":
        case "papirollo":
        case "olloko":
            lose(felhValasztas, szamValasztas);
            break;
        case "koko":
        case "papirpapir":
        case "olloollo":
            draw(felhValasztas, szamValasztas);
            break;

    }
}

function main() {
    ko_div.addEventListener('click',  function() {
        game("ko");
    })

    papir_div.addEventListener('click',  function() {
        game("papir");
    })

    ollo_div.addEventListener('click',  function() {
        game("ollo");
    })
}

main();