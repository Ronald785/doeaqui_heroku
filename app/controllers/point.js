const { readCenter, readCenterInventory, createCenter, updateCenter, updateCenterInventory, deleteCenter } = require("../models/point");
const { auth } = require("../../config/firebase");

//Render Create
function create(server, req, res) {
    let point = {};
    point.donation = [];
    res.render("point/create", {point});
}

//View Center
async function view(server, req, res) {
    const { id } = req.params;
    const data = await readCenter(id);
    const inventorys = await readCenterInventory(id);
    let dataInventorys = "";
    let type_donation = handleDonation(data.donation);

    if(Object.keys(inventorys).length != 0) {
        dataInventorys = JSON.stringify(inventorys.data).replaceAll('"', "'");
    }

    res.render("point/view", { point: data, inventorys: dataInventorys, type_donation });
}

//Edit Center
async function edit(server, req, res) {
    const { id } = req.params;
    const data = await readCenter(id);
    
    if(auth.currentUser.email != data.user_email) {
        return res.send("Você não tem acesso a esse centro!");
    }
    
    res.render("point/edit", { point: data, id });
}

//Edit Inventary
async function editInventory(server, req, res) {
    const { id } = req.params;
    const inventorys = await readCenterInventory(id);
    const arrayInventory = [];

    if(Object.keys(inventorys).length != 0) {
        for(let inventory of Object.keys(inventorys.data)) {
            arrayInventory.push(inventorys.data[inventory]);
        }
    }
    res.render("point/inventory", { inventorys: arrayInventory, id });
}


//Post Center
async function post(server, req, res) {

    let { name, about, email, site, whatsapp, locationLat, locationLng, photo, open_hours, open_weekends, instructions, donation } = req.body;

    if(name == "" || about == "" || email == "" || locationLat == "" || locationLng == "" || photo == "" || open_hours == "" || instructions == "") {
        return res.send("Por favor, preencha todos os campos obrigatórios!");
    }

    if(!Array.isArray(donation)) donation = [donation];

    const dataCenter = { 
        name: name, 
        about: about, 
        email: email, 
        site: site, 
        whatsapp: whatsapp,
        location: {
            "lat": Number(locationLat),
            "lng": Number(locationLng)
        }, 
        photo: photo, 
        open_hours: open_hours, 
        open_weekends: open_weekends, 
        instructions: instructions,
        donation: donation,
        user_email: auth.currentUser.email
    };

    let id = await createCenter(dataCenter);
    res.redirect(`/point/view/${id}`);
}

//Put Center
async function put(server, req, res) {
    
    let { name, about, email, site, whatsapp, locationLat, locationLng, photo, open_hours, open_weekends, instructions, donation } = req.body;

    const { id } = req.body;

    if(name == "" || about == "" || email == "" || locationLat == "" || locationLng == "" || photo == "" || open_hours == "" || instructions == "") {
        return res.send("Por favor, preencha todos os campos obrigatórios!");
    }

    if(!Array.isArray(donation)) donation = [donation];

    const dataCenter = { 
        name: name, 
        about: about, 
        email: email, 
        site: site, 
        whatsapp: whatsapp,
        location: {
            "lat": Number(locationLat),
            "lng": Number(locationLng)
        }, 
        photo: photo, 
        open_hours: open_hours, 
        open_weekends: open_weekends, 
        instructions: instructions,
        donation: donation,
        user_email: auth.currentUser.email
    };
    await updateCenter(dataCenter, id);
    res.redirect(`/point/view/${id}`);
}

//Put Center Inventory
async function putInventory(server, req, res) {
    const { id } = req.params;
    const { jsonInventory } = req.body;

    let json = JSON.parse(jsonInventory.replaceAll("'", '"'));
    let data = { idCenter: id, data: json};

    await updateCenterInventory(data, id);
    res.redirect(`/point/view/${id}`);
}

//Delete Center
async function delet(server, req, res) {
    const { id } = req.params;
    await deleteCenter(id);
    res.redirect(`/`)
}

function handleDonation(donation) {
    let type_donation = "";
    donation.forEach((value, index) => {
        if(value === "food") {
            value = "Alimento";
        } else if(value === "clothes") {
            value = "Roupas";
        } else if(value === "hygiene") {
            value = "Produtos de higiene";
        } else if(value === "blood") {
            value = "Sangue";
        }

        if(index === 0)
            type_donation = value;
        else
            type_donation += `, ${value}`;
    });
    return type_donation;
}

module.exports = {
    create,
    view,
    post,
    edit,
    editInventory,
    put,
    putInventory,
    delet
}