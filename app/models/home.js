const { db } = require("../../config/firebase");
const { collection, getDocs, query, where } = require("firebase/firestore");

const readCenters = async () => {
    try {
        const centers = await getDocs(collection(db, "centers"));
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const searchCenters = async (firstParameter, secondParameter, condition) => {
    try {
        const match = query(collection(db, "centers"), where(firstParameter, condition, secondParameter));
        const centers = await getDocs(match);
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

module.exports = {
    readCenters,
    searchCenters
};