//console.log(Isaac.actives["The Sad Onion"].moreDesc);
const itemsContainer = document.getElementById("items");
const quality = document.getElementById("quality");
const bossClears = {
	"clearSatan": document.getElementById("boss_satan"),
	"clearLamb": document.getElementById("boss_lamb"),
	"clearIsaac": document.getElementById("boss_isaac"),
	"clearBluebaby": document.getElementById("boss_bluebaby"),
	"clearMegasatan": document.getElementById("boss_megasatan"),
	"clearHush": document.getElementById("boss_hush"),
	"clearBossrush": document.getElementById("boss_bossrush"),
	"clearMother": document.getElementById("boss_mother"),
	"clearDelirium": document.getElementById("boss_delirium"),
	"clearGreed": document.getElementById("boss_greed"),
	"clearGreedier": document.getElementById("boss_greedier"),
	"clearBeast": document.getElementById("boss_beast"),
	"clearHeart": document.getElementById("boss_heart")
}
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
	"boss_bossrush": "Boss Rush",
	"boss_mother": "Mother",
	"boss_delirium": "Delirium",
	"boss_greed": "Greed",
	"boss_greedier": "Greedier",
	"boss_beast": "Beast",
	"boss_heart": "Heart"
}

let currentQuality = 0;

// Quality filter
quality.addEventListener("change", (event) => {
	console.log(event.target.value);
	currentQuality = event.target.value;
	renderItems();
});

/*
bossClears.clearSatan.addEventListener("change", (event) => {
	currentBoss["Satan"] = event.target.value;
});
*/

for (let _boss in bossClears) {
	//console.log(bossClears[_boss])
	bossClears[_boss].addEventListener("change", (event) => {
		currentBoss[bossHTMLtoJS[bossClears[_boss].name]] = event.target.checked;
		console.log(bossClears[_boss].name + " is set to " + event.target.checked);
		renderItems();
	});
}

// itemBuilder: Creates and returns an item node that will then be used in renderItems
function itemBuilder(name, itemid, pickup, quality, moreDesc, unlock) {
	let itemNode = document.createElement("div");
	let nameNode = document.createElement("p");
	let _name = document.createTextNode(name);
	nameNode.appendChild(_name);
	itemNode.appendChild(nameNode);
	return itemNode;
}

// renderItems: Clears the current item container and rebuilds it provided the items match the filters in place
function renderItems() {
	itemsContainer.innerHTML = "";
	for (let item in Isaac.actives) {
		if (checkQuality(item) && checkBosses(item))
			itemsContainer.appendChild(itemBuilder(Isaac.actives[item].name, "","","","",""));
	}
}

// checkQuality: Returns if $item is equal to or greater than the current selected quality slider
function checkQuality(item) {
	if (Isaac.actives[item].quality == "NA") return false;
	else return (parseInt(Isaac.actives[item].quality.split(" ")[1]) >= currentQuality)
}

// checkBosses: Returns if any of the currently active boss checkboxes are involved in the unlock of $item
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

