//console.log(Isaac.actives["The Sad Onion"].moreDesc);
const itemsContainer = document.getElementById("items");
const quality = document.getElementById("quality");
const clearSatan = document.getElementById("boss_satan");
const clearSatan = document.getElementById("boss_lamb");
const clearSatan = document.getElementById("boss_isaac");
const clearSatan = document.getElementById("boss_bluebaby");
const clearSatan = document.getElementById("boss_megasatan");
const clearSatan = document.getElementById("boss_hush");
const clearSatan = document.getElementById("boss_bossrush");
const clearSatan = document.getElementById("boss_mother");
const clearSatan = document.getElementById("boss_delirium");
const clearSatan = document.getElementById("boss_greed");
const clearSatan = document.getElementById("boss_greedier");
const clearSatan = document.getElementById("boss_beast");
const clearSatan = document.getElementById("boss_heart");
const currentBoss = {
	"Satan": false,
	"Lamb": false,
	"Isaac": false,
	"Blue Baby": false,
	"Mega Satan": false,
	"Hush": false,
	"Boss Rush": false,
	"Mother": false,
	"Delirium": false,
	"Greed": false,
	"Greedier": false,
	"Beast": false,
	"Heart": false
}
const bossHTMLtoJS = {
	"boss_satan": "Satan",
	"boss_lamb": "Lamb",
	"boss_isaac": "Isaac",
	"boss_bluebaby": "Blue Baby",
	"boss_megasatan": "Mega Satan",
	"boss_hush": "Hush",
	"boss_bossrush": "Boss R,
	"boss_mother": "Mother",
	"boss_delirium": "Delirium",
	"boss_greed": "Greed",
	"boss_greedier": "Greedier",
	"boss_beast": "Beast",
	"boss_heart": "Heart"
}

let currentQuality = 0;

quality.addEventListener("change", (event) => {
	console.log(event.target.value);
	currentQuality = event.target.value;
	renderItems();
});

clearSatan.addEventListener("change", (event) => {
	currentBoss["Satan"] = event.target.value;
});

function itemBuilder(name, itemid, pickup, quality, moreDesc, unlock) {
	let itemNode = document.createElement("div");
	let nameNode = document.createElement("p");
	let _name = document.createTextNode(name);
	nameNode.appendChild(_name);
	itemNode.appendChild(nameNode);
	return itemNode;
}

function renderItems() {
	itemsContainer.innerHTML = "";
	for (let item in Isaac.actives) {
		if (checkQuality(item) && checkBosses(item))
			itemsContainer.appendChild(itemBuilder(Isaac.actives[item].name, "","","","",""));
	}
}

function checkQuality(item) {
	if (Isaac.actives[item].quality == "NA") return false;
	else return (parseInt(Isaac.actives[item].quality.split(" ")[1]) >= currentQuality)
}

function checkBosses(item) {
	if (Isaac.actives[item].unlock.search("Unlock") < 0) return false;
	for (let boss in currentBoss) {
		if (currentBoss[boss]) {
			console.log(boss);
			if (Isaac.actives[item].unlock.search(boss) > 0) return true;
		}
	}
	return false;
}

renderItems();

