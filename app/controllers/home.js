const { readCenters } = require("../models/home");

//Home
module.exports.home = async (server, req, res) => {
    res.render("centers/index");
}

//Centers
module.exports.centers = async (server, req, res) => {
    let docs = await readCenters();
    let centers = {};

    docs.forEach((doc) => {
        centers[doc.id] = {};
        centers[doc.id].name = doc.data().name;
        centers[doc.id].location = doc.data().location;
        centers[doc.id].photo = doc.data().photo;
        centers[doc.id].donation = doc.data().donation;
    });

    res.send(centers);
}