let map;
let infoWindow;
let markers = [];
let infoWindows = {};
let customerMarker = null;
let userPosition;

function initMap() {
    const campinas = { lat: -22.9169727, lng: -47.0627705 };
    const mapOptions = {
        zoom: 12,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
        },
        center: campinas,
        streetViewControl: false,
        fullscreenControl: false
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    infoWindow = new google.maps.InfoWindow();

    map.addListener("click", () => {
        infoWindow.close();
    });

    createButtonControl();
    getUserLocation();
    readCenters();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setUserPosition);
    } 
    else {
        console.log("Acesso de localização negado!");
    }
}

function createButtonControl() {
    const controlDiv = document.createElement("div");

    const searchImage = document.createElement("img");
    searchImage.setAttribute("src", "images/search.svg");
    searchImage.setAttribute("alt", "Lupa");

    const control = createControl(map);

    control.appendChild(searchImage);
    controlDiv.appendChild(control);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

function createControl() {
    const controlButton = document.createElement("button");
  
    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.cursor = "pointer";
    controlButton.style.margin = "0px 10px 22px 0px";

    controlButton.title = "Localizar pontos";
    controlButton.type = "button";
  
    controlButton.addEventListener("click", () => {
        document.getElementById("openModal").style.opacity = 1;
        document.getElementById("openModal").style.pointerEvents = "auto";
        // closestPoint(userPosition, 1, "blood");
    });
  
    return controlButton;
}

function closeModal() {
    document.getElementById("openModal").style.opacity = 0;
    document.getElementById("openModal").style.pointerEvents = "none";
}

function setUserPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    userPosition = { lat, lng };
    map.setCenter(userPosition);
}

function readCenters() {
    fetch('/centers', {
        method: 'GET',
    })
    .then((res) => {
        return res.json();
    })
    .then((centers) => { 
        console.log("Centers: ", centers); 
        createMarkers(centers);
    });
}

function createMarkers(centers) {
    for (let centerID in centers) {
        let name = centers[centerID].name;
        let photo = centers[centerID].photo;
        let donation = centers[centerID].donation;
        let lat = centers[centerID].location.lat;
        let lng = centers[centerID].location.lng;
    
        let position = { lat: Number(lat), lng: Number(lng) };
        let title = name;
        let content = `
        <div class="mark-center">
            <p class="mark-text">${name}</p>
            <a href="/point/view/${centerID}">
                <img src="${photo}" alt="Image " class="mark-image">
            </a>
        </div>
        `;

        let icon = {
            url: "",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(50, 50)
        };

        if(donation == "food") icon["url"] = "/images/food.svg";
        if(donation == "clothes") icon["url"] = "/images/clothes.svg";
        if(donation == "blood") icon["url"] = "/images/blood.svg";

        addMarker(position, title, content, icon, donation);
    }
    console.log(markers)
}
    
function addMarker(position, title, content, icon, type) {
    const marker = new google.maps.Marker({
        position,
        title,
        map,
        icon,
        optimized: false,
    });

    marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(content);
        infoWindow.open(marker.getMap(), marker);
    });

    marker.type = type;

    markers.push(marker);
}

function closestPoint() {
    let location = userPosition;
    let numResults = 1;
    let type = document.getElementById("typeDonation").value;

    if (customerMarker) customerMarker.setMap(null);
    customerMarker = new google.maps.Marker({
        map: map,
        position: location
    });
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    closest = findClosestN(location, numResults, type);
    console.log(closest);
    for (var i = 0; i < closest.length; i++) {
        closest[i].setMap(map);
    }
    closeModal();
}

function findClosestN(userLocation, numberOfResults, type) {
    var closest = [];
    for (var i = 0; i < markers.length; i++) {
        if(markers[i].type == type) {
            markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, markers[i].getPosition());
            markers[i].setMap(null);
            closest.push(markers[i]);
        } 
    }
    closest.sort(sortByDist);
    return closest.splice(0, numberOfResults);
}

function sortByDist(a, b) {
    return (a.distance - b.distance)
}

document.addEventListener('DOMContentLoaded', initMap);