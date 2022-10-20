const { auth } = require("../../config/firebase");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, updateProfile } = require("firebase/auth"); 

async function signup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
    } catch (error) {
        const errorMessage = error.message;
    }
}

async function signin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        const errorMessage = error.message;
    }
}

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.log("Erro deslogando: ", error);
    }
}

async function resetUserPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        const errorMessage = error.message;
    }
}

async function updateUserPassword(newPassword) {
    try {
        await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
        console.error("Erro atualizando a senha: ", error);
    }
}

async function updateUserProfile(displayNameUser, photoURLUser) {
    const infoProfile = {
        displayName: displayNameUser,
        photoURL: photoURLUser
    }
    try {
        await updateProfile(auth.currentUser, infoProfile);
    } catch (error) {
        console.error("Erro atualizando o perfil: ", error);
    }
}

module.exports = {
    signup,
    signin,
    logout,
    resetUserPassword,
    updateUserPassword,
    updateUserProfile
}