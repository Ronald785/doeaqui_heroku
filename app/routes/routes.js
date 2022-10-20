const { home , centers} = require('../controllers/home');
const { about, contact } = require('../controllers/info');

module.exports = {
    home: (server) => { 
        server.get("/", (req, res) => {
            home(server, req, res);
        });
    },
    centers: (server) => { 
        server.get("/centers", (req, res) => {
            centers(server, req, res);
        });
    },
    about: (server) => { 
        server.get("/about", (req, res) => {
            about(server, req, res)
        });
    },
    contact: (server) => { 
        server.get("/contact", (req, res) => {
            contact(server, req, res);
        });
    }
}