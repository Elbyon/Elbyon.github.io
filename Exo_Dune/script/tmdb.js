let baseURL = 'https://api.themoviedb.org/3';
let configData = null;
let baseImageURL = null;
let apiKey = "api_key=c1b53ed930c89da57abe95c35c8ba428&language=fr";
let imgUrl = "https://image.tmdb.org/t/p/w500";
let movieUrl = baseURL + "/movie/438631?" + apiKey;
let castingUrl = baseURL + "/movie/438631/credits?" + apiKey;




getMovies();
getCasting();



function getMovies(){
    console.log(movieUrl);
    fetch(movieUrl)
    .then(function(resp){
        return resp.json();
    })
    .then (function(data3){
        console.log(data3)
        let tmdb_dune = document.getElementById('data_dune');
        let dateSortie = data3.release_date;
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];


        let totalMin = data3.runtime;
        let hours = Math.floor(totalMin / 60);
        let minutes = totalMin % 60;

        function format(dateSortie) {
            var date = new Date(dateSortie);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                month = date.getMonth();
                monthLabel = monthNames[month];
                return date.getDate() + ' ' + monthLabel  + ' ' + date.getFullYear();
            }
        }
        console.log(format(dateSortie));

        tmdb_dune.innerHTML = `
            <div class="first-column">
                <img src="${imgUrl + data3.poster_path}" alt=${data3.original_title}">
            </div>
            <div class="second-column">
                <h3>${data3.original_title}</h3>
                <p class="fontlittle">${format(dateSortie)} / ${hours}h${minutes}</p>
                <div class="mt-3">
                    <a class="btnStyle"> ${data3.genres[0].name}</a>
                    <a class="btnStyle">${data3.genres[1].name}</a>
                </div>
                <p id="insertCast" class="fontlittle mt-4">Note du public: ${data3.vote_average}/10</p>
                <h4 class="mt-4">Synopsis</h4>
                <p class="fontlittle">${data3.overview}</p>
                <h4 class="mt-4">Vivre l'experience ${data3.original_title}</h4>
                <div class="blu-ray amazon">
                <h5 class="mt-3">En DVD BLU-RAY</h5>
                    <a target="_blank" href="https://www.amazon.fr/gp/product/B09G3G97NQ?ie=UTF8&tag=antoinerigot-21&camp=1642&linkCode=xm2&creativeASIN=B09G3G97NQ" alt="blu-ray Dune sur Amazon">
                    <img src="./media/Dune-Blu-ray.png" alt="Blu-Ray Dune"/>
                    <h6 class="mt-2">Blu-ray ${data3.original_title} (2021)</h6>
                    <p class="fsa">29,99€</p>
                    </a>
                </div>
                <div class="cd amazon">
                    <h5 class="mt-3">En CD</h5>
                    <a target="_blank" href="https://www.amazon.fr/gp/product/B09GKWB74J?ie=UTF8&tag=antoinerigot-21&camp=1642&linkCode=xm2&creativeASIN=B09GKWB74J" alt="CD Dune sur Amazon">
                    <img src="./media/Dune-CD.png" alt="CD Dune"/>
                    <h6 class="mt-2">${data3.original_title} (Original Soundtrack)</h6>
                    <p class="fsa">21,57€</p>
                    </a>
                </div>
            </div>
                
                
            `

        console.log(tmdb_dune);
    })

}

function getCasting(){
    fetch(castingUrl)
    .then(function(resp){
        return resp.json();
    })
    .then (function(data4){
        console.log(data4)
        let tmdb_dune = document.getElementById('data_dune');
        let container = document.querySelector('#insertCast');
        container.insertAdjacentHTML('beforebegin', `<p class="fontlittle mt-3"><span>Avec</span> ${data4.cast[0].name}, ${data4.cast[1].name}, ${data4.cast[2].name}</p>`)
        // tmdb_dune.innerHTML += `
        // <p class="fontlittle"><span>Avec</span> ${data4.cast[0].name}, ${data4.cast[1].name}, ${data4.cast[2].name}</p>
        // `
})
}







// let getConfig = function (){
//     let url = "".concat(baseURL, 'configutation?api_key=', APIKEY);
//     fetch(url)
//     .then((result)=>{
//         return result.json();
//     })
//     .then((data)=>{
//         baseImageURL = data.images.secure_base_url;
//         configData = data.images;
//         console.log('config:', data);
//         console.log('config fetched');
//         runSearch('dune')
//     })
//     .catch(function(err){
//         alert(err);
//     });
// }

// let runSearch = function (keyword) {
//     let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword);
//     fetch(url)
//     .then(result=>result.json())
//     .then((data)=>{
//         //process the returned data
//         document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
//         //work with results array...
        
//     })
// }

// console.log(getConfig);