const server = require("./config/server");
const routes = require("./app/routes/routes");
const routes_crud = require("./app/routes/crud");
const routes_auth = require("./app/routes/auth");

routes.home(server);
routes.centers(server);
routes.about(server);
routes.contact(server);

routes_crud.read(server);
routes_crud.post(server);
routes_crud.put(server);
routes_crud.delet(server);

routes_auth.login(server);
routes_auth.logout(server);
routes_auth.createLogin(server);
routes_auth.resetPassword(server);
routes_auth.denied(server);
routes_auth.manage(server);