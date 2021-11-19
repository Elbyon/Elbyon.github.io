var map = document.querySelector('#map')

var paths = map.querySelectorAll('.map__image a')

var links = map.querySelectorAll('.map__list a')

var content = document.getElementById("content")
var button = document.getElementById("show-more")

button.onclick = function(){
    if(content.classList.contains('open')){
        content.classList.remove('open')
        button.innerHTML = "Voir le Pack Control"
    } else{
        content.classList.add('open')
        button.innerHTML = "Fermer le Pack Control"
    }
}

//Polyfill du foreach
if (NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function (callback){
        [].forEach.call(this, callback)
    }
}

var activeArea = function(id) {
    var fullId = 'list-' + id
    var libelle = document.getElementById(fullId).textContent
    var thezone = document.getElementById("zone").value = libelle
    map.querySelectorAll('.is-active').forEach(function (item){
        item.classList.remove('is-active')
    })
    if (id !== undefined){
        document.querySelector('#list-' + id).classList.toggle('is-active')
        document.querySelector('#region-' + id).classList.toggle('is-active')
    }
    
    
    /*if (a.classList.contains('is-active')){
        activeArea()
    }*/
}

paths.forEach(function (path){
    path.addEventListener('click', function (e){
        //debugger
        //console.log('test')
        var id = this.id.replace('region-','')
        activeArea(id)
    })
})

links.forEach(function (link){
    link.addEventListener('click', function (){
        var id = this.id.replace('list-', '')
        activeArea(id)
    })
})

document.getElementById('date').valueAsDate = new Date();

