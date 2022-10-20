const { signup, signin, logout, resetUserPassword, updateUserPassword, updateUserProfile } = require("../models/login");

//Login
module.exports.login = async (server, req, res) => {
    const { email, password } = req.body;
    await signin(email, password);
    res.redirect("/manage");
}

//Create
module.exports.createLogin = async (server, req, res) => {
    const { email, password, passwordConfirm } = req.body;

    if(password != passwordConfirm) res.send("Senhas divergem");

    await signup(email, password);
    res.redirect("/auth/login");
}

//Reset Password
module.exports.resetPassword = async (server, req, res) => {
    const { email } = req.body;
    await resetUserPassword(email);
    res.redirect("/auth/login");
}

//Logout
module.exports.logout = async (server, req, res) => {
    await logout();
    res.redirect("/auth/login");
}

//Update Password
module.exports.updatePassword = async (server, req, res) => {
    const { password } = req.body;
    await updateUserPassword(password);
}

//Update Profile
module.exports.updateProfile = async (server, req, res) => {
    const { name, link } = req.body;
    await updateUserProfile(name, link);
    res.redirect("/manage");
}