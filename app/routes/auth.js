const { login, logout, createLogin, resetPassword, updateProfile } = require('../controllers/login');
const { manage, manageEdit } = require('../controllers/manage');
const { auth } = require("../../config/firebase");

module.exports = {
    login: (server) => { 
        server.get("/auth/login", (req, res) => {
            if(auth.currentUser) return res.redirect("/manage");

            res.render("auth/login");
        });
        server.post("/auth/login", (req, res) => {
            login(server, req, res);
        });
    },
    logout: (server) => { 
        server.get("/auth/logout", (req, res) => {
            logout(server, req, res);
        });
    },
    createLogin: (server) => { 
        server.get("/auth/create", (req, res) => {
            res.render("auth/create");
        });

        server.post("/auth/create", (req, res) => {
            createLogin(server, req, res);
        });
    },
    resetPassword: (server) => { 
        server.get("/auth/reset", (req, res) => {
            if(auth.currentUser) return res.redirect("/manage");
            
            res.render("auth/reset");
        });
        server.post("/auth/reset", (req, res) => {
            resetPassword(server, req, res);
        });
    },
    denied: (server) => { 
        server.get("/auth/denied", (req, res) => {
            res.render("auth/denied");
        });
    },
    manage: (server) => { 
        server.get("/manage", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            
            manage(server, req, res);
        });
        server.get("/manage/edit", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            
            manageEdit(server, req, res);
        });
        server.post("/manage/edit", (req, res) => {
            if(!auth.currentUser) return res.redirect("/auth/denied");
            
            updateProfile(server, req, res);
        });
    }
}