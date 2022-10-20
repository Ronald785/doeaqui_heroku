const { create, delet, edit, editInventory, post, put, putInventory, view } = require('../controllers/point');
const { auth } = require("../../config/firebase");

module.exports = {
    read: (server) => { 
        server.get("/create", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            create(server, req, res);
        });
        server.get("/point/view/:id", (req, res) => {
            view(server, req, res);
        });
        server.get("/point/edit/:id", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            edit(server, req, res);
        });
        server.get("/point/inventory/:id", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            editInventory(server, req, res);
        });
    },
    post: (server) => { 
        server.post("/point", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            post(server, req, res);
        });
    },
    put: (server) => { 
        server.put("/point", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            put(server, req, res);
        });

        server.put("/point/inventory/:id", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            putInventory(server, req, res);
        });
    },
    delet: (server) => { 
        server.get("/point/delet/:id", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            delet(server, req, res);
        });
    }
}