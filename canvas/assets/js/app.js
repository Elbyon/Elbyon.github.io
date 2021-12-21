document.addEventListener('DOMContentLoaded', (ev)=>{
    // let image1 = document.getElementById('vehicule_privee');
    // let image2 = document.getElementById('vehicule_utilitaire');
    // let image3 = document.getElementById('vehicule_poid_lourd');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    let imgObj = new Image();
    
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

    let BtnPrivee = document.getElementById("BtnPrivee");
    let BtnUtilitaire = document.getElementById("BtnUtilitaire");
    let BtnPoidLourd = document.getElementById("BtnPoidLourd");

    BtnPrivee.onclick = changeToPrivee;
    BtnUtilitaire.onclick = changeToUtilitaire;
    BtnPoidLourd.onclick = changeToPoidLourd;

    function changeToPrivee(){
        imgObj.src="./assets/media/privee.png";
    }
    function changeToUtilitaire(){
        imgObj.src="./assets/media/utilitaire.png";
    }
    function changeToPoidLourd(){
        imgObj.src="./assets/media/poid_lourd.png";
    }

    let BtnClear = document.getElementById("BtnClear");
    BtnClear.onclick = clearCanvas;
    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    let BtnDownload = document.getElementById("BtnDownload");

    // class ImpactShape{
    //     constructor(xpos, ypos, radius, color){
    //         this.xpos = xpos;
    //         this.ypos = ypos;
    //         this.radius = radius;
    //         this.color = color;
    //     }

    //     draw(ctx){
    //         ctx.beginPath();
    //         ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    //         ctx.stroke();
    //     }
    // }

    // let my_circle = new ImpactShape(50, 50, 25, "black");

    // my_circle.draw(ctx);

    let drawing = false;

    function startPosition(e){
        drawing = true;
        draw(e);
    }
    function finishedPosition(){
        drawing = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!drawing){
            return
        }
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    // const dataURI = canvas.toDataURL("image/jpeg")
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

    // const canvaFinal = document.getElementById('canvas');
    // html2canvas(canvaFinal).then(function(canvas){
    //     document.body.appendChild(canvas);
    // });

});