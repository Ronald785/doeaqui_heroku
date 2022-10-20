const { infoUser, searchCenters } = require("../models/manage");

//Manage
module.exports.manage = async (server, req, res) => {
    const user = infoUser();
    const centers = await searchCenters();
    console.log("Centers:", centers);
    res.render("manage/manage", { user, centers });
}

//Manage Edit
module.exports.manageEdit = (server, req, res) => {
    const user = infoUser();
    res.render("manage/edit", { user });
}