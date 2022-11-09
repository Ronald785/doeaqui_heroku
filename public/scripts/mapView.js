let map;
let marker;

function initMap() {
    let locationLat = document.getElementById("locationLat").value;
    let locationLng = document.getElementById("locationLng").value;
    let location = { lat: Number(locationLat), lng: Number(locationLng) };
    
    const optionsMap = {
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        center: location,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    }
    
    map = new google.maps.Map(document.getElementById("mapPoint"), optionsMap);
    marker = new google.maps.Marker({ title:"Ponto de doação" });
    marker.setPosition(location);
    marker.setMap(map);
}

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("whatsapp")) {
        let whatsapp = document.getElementById("whatsapp").value;
        whatsapp = whatsapp.replace(/[^a-zA-Z0-9]/g, "");
    }

    if(document.getElementById("whatsappLink")) {
        let whatsappLink = document.getElementById("whatsappLink");
        whatsappLink.href = "https://wa.me/55" + whatsapp;
    }

    if(document.querySelector("#inventorys")) {
        if(document.querySelector("#inventorys").value != "") {
            let stringInventorys = document.querySelector("#inventorys");
            // console.log(stringInventorys.value);
            let inventorys = JSON.parse(stringInventorys.value.replaceAll("'", '"'));
            
            console.log(inventorys);

            dataCharts = [];
            for(let key of Object.keys(inventorys)) {
                let series = {};

                series["name"] = inventorys[key].name;
                if (inventorys[key].level == 0) {
                    series["color"] = "#FF0000";
                    series["data"] = [[ 0, Number(inventorys[key].amount) ]];
                } else if (inventorys[key].level == 1) {
                    series["color"] = "#FFFF00";
                    series["data"] = [[ 1, Number(inventorys[key].amount) ]];
                } else if (inventorys[key].level == 2) {
                    series["color"] = "#008000";
                    series["data"] = [[ 2, Number(inventorys[key].amount) ]];
                }
                // console.log(inventorys[key]);
                dataCharts.push(series);
            }
            var chart = Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ""
                },
                credits: {
                    enabled: false
                },
                colors: ['#FF0000', '#FFFF00', '#008000'],
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: "Quantidade"
                    }
                },
                xAxis: {
                    categories: ['Baixo', 'Médio', 'Alto']
                },
                series: dataCharts
            });
            console.log("Data Charts", dataCharts);
        } else {
            console.log("Vázio: ", document.querySelector("#inventorys").value);
        }
    }
});

document.addEventListener('DOMContentLoaded', initMap);