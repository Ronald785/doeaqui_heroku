const { auth, db } = require("../../config/firebase");
const { collection, query, where, getDocs } = require("firebase/firestore");

function infoUser() {
    const user = auth.currentUser;
    const email =  user.email;
    const name =  user.displayName;
    const image =  user.photoURL;

    return { email, name, image };
}

async function searchCenters() {
    try {
        const match = query(collection(db, "centers"), where("user_email", "==", auth.currentUser.email));
        const querys = await getDocs(match);
        const centers = [];
        querys.forEach((doc) => {
            // console.log(`ID: ${doc.id}, Name: ${doc.data().name}`);
            const center = {};
            center["id"] = doc.id;
            center["name"] = doc.data().name;
            centers.push(center);
        });
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

module.exports = {
    infoUser,
    searchCenters
}