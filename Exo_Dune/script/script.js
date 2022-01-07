//const { imageOverlay } = require("leaflet");

//const { imageOverlay } = require("leaflet");

let etatLecteur;

function lecteurPret(event) {
    // event.target = lecteur
    event.target.setVolume(50);
}

function changementLecteur(event) {
    // event.data = état du lecteur
    etatLecteur = event.data;
}

let lecteur;

function onYouTubeIframeAPIReady() {
    lecteur = new YT.Player("iframeYT", {
        height: "390",
        width: "640",
        videoId: "Qw3xs_hWxh4",
        playerVars: {
            color: "white",
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0
        },
        events: {
            onReady: lecteurPret,
            onStateChange: changementLecteur
        }
    });
}

/*
// Hauteur de la vidéo
const hauteurVideo = $("#iframeYT").height();
// Position Y de la vidéo
const posYVideo = $("#iframeYT").offset().top;
// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;

// Gestion du défilement
$(window).scroll(function () {
    // Récupération de la valeur du défilement vertical
    const scroll = $(window).scrollTop();

    // Classe permettant l'exécution du CSS
    $("#iframeYT").toggleClass(
        "scroll",
        etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
    );
});*/

let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mountains_front = document.getElementById('mountains_front');
let baseline = document.getElementById('baseline');
let header = document.getElementById('header');
let btnChange = document.getElementById('btnChange');
let body = document.getElementById('body');
let main = document.getElementById('main');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    stars.style.left = value * 0.25 + 'px';
    moon.style.top = value * 0.5 + 'px';
    mountains_behind.style.top = value * 0.2 + 'px';
    mountains_front.style.top = value * 0 + 'px';
    text.style.marginRight = value * 3 + 'px';
    text.style.marginTop = value * 1 + 'px';
    baseline.style.marginRight = value * 3 + 'px';
    baseline.style.marginTop = value * 1 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
    header.style.marginTop = value * 0.5 + 'px';
    
})

btnChange.addEventListener('click', () => {
    if (btnChange.classList.contains("jourBtn")){
        document.getElementById("moon").src="./media/paralax/moon2.png";
        document.getElementById("mountains_behind").src="./media/paralax/mountains_behind2.png";
        document.getElementById("mountains_front").src="./media/paralax/mountains_front2.png";
        document.getElementById("stars").src="./media/paralax/stars2.png";
        document.getElementById("body").classList.remove('jour');
        document.getElementById("body").classList.add('nuit');
        document.getElementById("btnChange").classList.remove("jourBtn");
        document.getElementById("btnChange").classList.add("nuitBtn")
        document.getElementById("main").classList.remove("mainJour");
        document.getElementById("main").classList.add("mainNuit")
    }
    else{
        document.getElementById("moon").src="./media/paralax/moon.png";
        document.getElementById("mountains_behind").src="./media/paralax/mountains_behind.png";
        document.getElementById("mountains_front").src="./media/paralax/mountains_front.png";
        document.getElementById("stars").src="./media/paralax/stars.png";
        document.getElementById("body").classList.remove('nuit');
        document.getElementById("body").classList.add('jour');
        document.getElementById("btnChange").classList.remove("nuitBtn");
        document.getElementById("btnChange").classList.add("jourBtn")
        document.getElementById("main").classList.remove("mainNuit");
        document.getElementById("main").classList.add("mainJour")
    }
})