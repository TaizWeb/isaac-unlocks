//console.log(Isaac.actives["The Sad Onion"].moreDesc);
const itemsContainer = document.getElementById("items");
const quality = document.getElementById("quality");
let detailsPopup = false;
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

// Adding a listener for every boss checkbox
for (let _boss in bossClears) {
	bossClears[_boss].addEventListener("change", (event) => {
		currentBoss[bossHTMLtoJS[bossClears[_boss].name]] = event.target.checked;
		console.log(bossClears[_boss].name + " is set to " + event.target.checked);
		renderItems();
	});
}

// itemBuilder: Creates and returns an item node that will then be used in renderItems
function itemBuilder(name, itemid, pickup, quality, moreDesc, unlock) {
	let itemNode = document.createElement("div");
	itemNode.className = "item-container";
	// Name
	let nameNode = document.createElement("p");
	let _name = document.createTextNode(name + " [" + quality + "]");
	nameNode.appendChild(_name);

	// Pickup
	let pickupNode = document.createElement("p");
	let _pickup = document.createTextNode(pickup);
	pickupNode.appendChild(_pickup);
	
	// Description
	/*let descNode = document.createElement("p");
	let _desc = document.createTextNode(moreDesc);
	descNode.appendChild(_desc);
	descNode.className = "item-desc";
	*/

	// Unlock
	let unlockNode = document.createElement("p");
	let _unlock = document.createTextNode(unlock);
	unlockNode.appendChild(_unlock);

	// Appending them all to itemNode and returning it
	itemNode.appendChild(nameNode);
	itemNode.appendChild(pickupNode);
	//itemNode.appendChild(descNode);
	itemNode.appendChild(unlockNode);

	itemNode.addEventListener("click", (event) => {
		renderDetails(name, itemid, pickup, quality, moreDesc, unlock);
		detailsPopup = true;
	});
	return itemNode;
}

// Popup code
let popup = document.getElementById("popup");
let popupBody = document.getElementById("popup-body");
let dismissClick = true;

// If the outside area is clicked, dismiss the entire thing
popup.addEventListener("click", (event) => {
	if (dismissClick)
		popup.className = popupBody.className = popupBody.innerHTML = "";
	else
		dismissClick = true;
});

// If the inner is clicked, keep it
popupBody.addEventListener("click", (event) => {
	dismissClick = false;
	//popup.className = "";
});

function renderDetails(name, itemid, pickup, quality, moreDesc, unlock) {
	popupBody.innerHTML = "";
	// I was going to just "re-use" the itemBuilder, but there would be too many problems with stuff like CSS conflicts and frankly it'd be easier to just re-make it
	let itemNode = document.createElement("div");
	itemNode.className = "popup-container";
	// Name
	let nameNode = document.createElement("p");
	let _name = document.createTextNode(name + " [" + quality + "]");
	nameNode.appendChild(_name);

	// Pickup
	let pickupNode = document.createElement("p");
	let _pickup = document.createTextNode(pickup);
	pickupNode.appendChild(_pickup);
	
	// Description
	let descNode = document.createElement("p");
	let _desc = document.createTextNode(moreDesc);
	descNode.appendChild(_desc);
	descNode.className = "item-desc";

	// Unlock
	let unlockNode = document.createElement("p");
	let _unlock = document.createTextNode(unlock);
	unlockNode.appendChild(_unlock);

	// Appending them all to itemNode and returning it
	itemNode.appendChild(nameNode);
	itemNode.appendChild(pickupNode);
	itemNode.appendChild(descNode);
	itemNode.appendChild(unlockNode);
	popupBody.appendChild(itemNode);

	popup.className = popupBody.className = "active";
}

// renderItems: Clears the current item container and rebuilds it provided the items match the filters in place
function renderItems() {
	itemsContainer.innerHTML = "";
	for (let item in Isaac.actives) {
		if (checkQuality(item) && checkBosses(item)) {
			let itemInfo = Isaac.actives[item];
			itemsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
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

