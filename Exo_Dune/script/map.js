//////////////////////////////////////////////////////

// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  // Injection du résultat dans du texte
  const lat = Math.round(1000 * position.coords.latitude) / 1000;
  const long = Math.round(1000 * position.coords.longitude) / 1000;
  $("p#loc-output").text(`Latitude: ${lat}°, Longitude: ${long}°`);
  var latlng = [lat, long];
  carte.flyTo(latlng);
} 

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("p").text(natureErreur);
}

// Récupération des coordonnées au clic sur le bouton
$("button").click(function () {
  // Support de la géolocalisation
  if ("geolocation" in navigator) {
    // Support = exécution du callback selon le résultat
    navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    });
  } else {
    // Non support = injection de texte
    $("p").text("La géolocalisation n'est pas supportée par votre navigateur");
  }
});



////////////////////////////////////////////////////////////////////////


// Création de la carte, vide à ce stade
let carte = L.map('carte', {
    center: [47.321749640286676, 5.041449507090162], // Centre de la France
    zoom: 15,
    minZoom: 4,
    maxZoom: 19,
  });
  
  // Ajout des tuiles (ici OpenStreetMap)
  // https://wiki.openstreetmap.org/wiki/Tiles#Servers
  L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(carte);
  
  // Ajout de l'échelle
  L.control.scale().addTo(carte);

  function createCustomIcon (feature, latlng) {
    let leafletIcon = L.icon({
      iconUrl: './media/logo/leaflet_icon.png',
      iconSize:     [30, 30], // width and height of the image in pixels
      shadowSize:   [35, 20], // width, height of optional shadow image
      iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
      shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    return L.marker(latlng, { icon: leafletIcon })
  }
  
  // create an options object that specifies which function will called on each feature
  let myLayerOptions = {
    pointToLayer: createCustomIcon
  }
  
  // create the GeoJSON layer
  L.geoJSON(geojson, myLayerOptions).addTo(carte)

  // console.log(leafletIcon);
  // L.geoJSON(geojson,{icon: leafletIcon}).addTo(carte);