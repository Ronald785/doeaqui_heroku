function createInput() {
    let inputs = document.querySelector("#inputs");
    let div = document.createElement("div");
    div.setAttribute("class", "input-block");
    let input = `
        <input type="text" name="name" class="inventory-name" placeholder="Nome"/>
        <button type="button" class="inventory-btn" onclick="minusAmount(this)">-</button>
        <input type="number" name="name" class="inventory-amount" value="0"/>
        <button type="button" class="inventory-btn" onclick="plusAmount(this)">+</button>
        <select name="level" class="inventory-level">
            <option value="0">Baixo</option>
            <option value="1">Médio</option>
            <option value="2">Alto</option>
        </select>
        <button type="button" class="inventory-btn delete" onclick="deleteInput(this)">X</button>
    `;
    div.innerHTML = input;
    inputs.appendChild(div);
}

function deleteInput(params) {
    params.parentNode.parentNode.removeChild(params.parentNode);
}

function minusAmount(btn) {
    var amount = btn.parentNode.querySelector(".inventory-amount");
    if(amount.value > 0) amount.value = Number(amount.value) - 1;
}

function plusAmount(btn) {
    var amount = btn.parentNode.querySelector(".inventory-amount");
    amount.value = Number(amount.value) + 1;
}

function saveInventory() {
    let inputs = document.querySelector("#inputs");
    let inventorys = inputs.querySelectorAll(".input-block");

    let jsonInventory = {};
    for (let inventory of inventorys) {
        let name = inventory.querySelector(".inventory-name").value;
        let amount = inventory.querySelector(".inventory-amount").value;
        let level = inventory.querySelector(".inventory-level").value;

        if(name != "") {
            let cleanName = cleanString(name);
            jsonInventory[cleanName] = {};
            jsonInventory[cleanName]["name"]  = name;
            jsonInventory[cleanName]["amount"] = amount;
            jsonInventory[cleanName]["level"]  = level;
        }
    }
    document.querySelector("#jsonInventory").value = JSON.stringify(jsonInventory).replaceAll('"', "'");
    console.log("Inventory", jsonInventory);
    document.querySelector("#formInventory").submit();
}

function cleanString(string) {
    return string
        .toLowerCase() //all to lowercase
        .normalize('NFD') //canonically equivalent strings
        .replace(/[\u0300-\u036f]/g, "") //replace special caracters
        .replace(/[^a-z0-9]/g, ""); //replace everything != string and number
}