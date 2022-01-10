document.addEventListener('DOMContentLoaded', (ev)=>{
    //Instancie le canvas
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 920;
    canvas.height = 600;

    let imgObj = new Image();
    
    //Gère la proportionnalité de la taille du canvas par rapport à l'image
    imgObj.onload = function(){
        let w = canvas.width;
        let nw = imgObj.naturalWidth;
        let nh = imgObj.naturalHeight;
        let aspect = nw / nh;
        let h = w / aspect;
        console.log('height', h);
        canvas.height = h;
        ctx.drawImage(imgObj, 0, 0, w, h);
    };

    //Instancie les boutons
    let BtnPrivee = document.getElementById("BtnPrivee");
    let BtnUtilitaire = document.getElementById("BtnUtilitaire");
    let BtnPoidLourd = document.getElementById("BtnPoidLourd");
    let BtnClear = document.getElementById("BtnClear");
    let BtnDownload = document.getElementById("BtnDownload");
    let BtnImpact = document.getElementById("impact");
    let BtnRayure = document.getElementById("rayure");

    //Change l'image de fond
    function changeToPrivee(){
        imgObj.src="./assets/media/privee.png";
    }
    function changeToUtilitaire(){
        imgObj.src="./assets/media/utilitaire.png";
    }
    function changeToPoidLourd(){
        imgObj.src="./assets/media/poid_lourd.png";
    }

    //Clear le canvas
    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //onClick des btns
    BtnPrivee.onclick = changeToPrivee;
    BtnUtilitaire.onclick = changeToUtilitaire;
    BtnPoidLourd.onclick = changeToPoidLourd;
    BtnClear.onclick = clearCanvas;
    BtnImpact.onclick = changeToImpact;
    BtnRayure.onclick = changeToRayure;

    //Définie la couleur du point au lancement
    let draw_color = "red"

    //Change la couleur du point
    function changeToImpact(){
        draw_color = "red";
    };

    function changeToRayure(){
        draw_color = "orange";
    };

    // Création du point
    let signaler = function(e){
        let bounds = e.target.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;

        ctx.beginPath();
        ctx.arc(x,y,10,0,Math.PI*2,false);
        ctx.fillStyle = draw_color;

        ctx.fill();
    }

    canvas.addEventListener("mousedown", signaler);
    

    // Téléchargement du canvas au format png
    BtnDownload.addEventListener("click", function(){
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
        } else{
            const a = document.createElement("a");

            document.body.appendChild(a);
            a.href = canvas.toDataURL();
            a.download = "canvas-image.png";
            a.click();
            document.body.removeChild(a);
        }
    });
});