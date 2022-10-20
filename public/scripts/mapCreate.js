let map;
let marker;
let geocoder;

function initMap() {
    const campinas = { lat: -22.9062874, lng: -47.0820304 };
    const optionsMap = {
        zoom: 15,
        center: campinas,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
    }
    map = new google.maps.Map(document.getElementById("mapPoint"), optionsMap); 
    marker = new google.maps.Marker({ title:"Ponto de doação" });
    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
        console.log(event);
        let locationLat = document.getElementById("locationLat");
        let locationLng = document.getElementById("locationLng");
        locationLat.value = event.latLng.lat();
        locationLng.value = event.latLng.lng();
    });
    getLocation();
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        console.log("Geolocation não é suportada pelo navegador.");
    }
}
  
function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    map.setCenter({ lat , lng });
}

function addMarker(location, map) {
    marker.setPosition(location);
    marker.setMap(map);
}

function searchZipCode() {
    const cep = document.getElementById("cep");
    const myRE = new RegExp("\\d{5}-\\d{3}");
    valueCheckZip = document.getElementById("valueCheckZip");

    if(myRE.test(cep.value)) {
        geocode(cep.value);
    }
    else {
        alert("O CEP é inválido");
        cep.value = "";
    }
}

function geocode(address) {
    geocoder.geocode({address}, (results, status) => {   
        if(status == "OK") {
            geoLocation = results[0].geometry.location;
            map.setCenter(geoLocation);
        } else {
            alert("Erro geocode: " + status);
            document.getElementById("cep").value = "";
        }
    });       
}

$(document).ready(function () { 
    var $cep = $("#cep");
    $cep.mask('00000-000');

    var $whatsapp = $("#whatsapp");
    $whatsapp.mask('(00) 0 0000-0000');
});

function openOnWeekends() {
    let active = document.getElementsByClassName("active")[0];
    active.classList.remove("active");

    let openOnWeekends = document.getElementById("btnOpen");
    openOnWeekends.classList.add("active");

    let open_weekends = document.getElementById("open_weekends");
    open_weekends.value = true;
}

function notOpenOnWeekends() {
    let active = document.getElementsByClassName("active")[0];
    active.classList.remove("active");

    let notOpenOnWeekends = document.getElementById("btnNot");
    notOpenOnWeekends.classList.add("active");

    let open_weekends = document.getElementById("open_weekends");
    open_weekends.value = false;
}