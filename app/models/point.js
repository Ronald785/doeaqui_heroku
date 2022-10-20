const { db } = require("../../config/firebase");
const { addDoc, collection, deleteDoc, doc, getDoc,getDocs, query, where, updateDoc } = require("firebase/firestore");

const readCenter = async (idCenter) => {
    try {
        const center = await getDoc(doc(db, "centers", idCenter));
        return center.data();
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const readCenterInventory = async (idCenter) => {
    try {
        const match = query(collection(db, "inventory"), where("idCenter", "==", idCenter));
        const querySnapshot = await getDocs(match);
        let inventory = {};
        if(!querySnapshot.empty) {
            querySnapshot.forEach((doc) => { inventory = doc.data(); });
        }
        return inventory;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const createCenter = async (dataCenter) => {
    try {
        const center = await addDoc(collection(db, "centers"), dataCenter);
        return center.id;
    } catch (err) {
        console.error("Erro salvando o centro: ", err);
    }
}

const updateCenter = async (dataCenter, idCenter) => {
    try {
        const center = doc(db, "centers", idCenter);
        await updateDoc(center, dataCenter);
        console.log("Centro atualizado");
        return;
    } catch (err) {
        console.error(`Erro atualizando o centro: ${idCenter}`, err);
    }
}

const updateCenterInventory = async (data, idCenter) => {
    try {
        await addDoc(collection(db, "inventory"), data);
        return;
    } catch (err) {
        console.error(`Erro atualizando o estoque docentro: ${idCenter}`, err);
    }
}

const deleteCenter = async (idCenter) => {
    try {
        const center = doc(db, "centers", idCenter);
        await deleteDoc(center);
        console.log(`Centro deletado: ${idCenter}`);
        return;
    } catch (err) {
        console.error(`Erro deletando o centro: ${idCenter}`, err);
    }
}


module.exports = {
    readCenter,
    createCenter,
    readCenterInventory,
    updateCenter,
    updateCenterInventory,
    deleteCenter
};