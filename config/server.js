const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const server = express();
const port = process.env.PORT || 3000;

server.set("view engine", "njk");
server.use(express.static('./public'));
server.use(methodOverride("_method"));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("app/views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(port, () => {
    console.log(`Server iniciado na porta: ${port}!`)
});

module.exports = server;