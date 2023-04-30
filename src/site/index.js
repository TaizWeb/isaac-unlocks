const itemsContainer = document.getElementById("items");
const trinketsContainer = document.getElementById("trinkets");
const challengesContainer = document.getElementById("challenges");
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
	"clearHeart": document.getElementById("boss_heart"),
	"clearChallenges": document.getElementById("boss_challenges")
}
const currentBoss = {
	"Satan": false,
	"The Lamb": false,
	"Isaac": false,
	"???": false,
	"Mega Satan": false,
	"Hush": false,
	"Boss Rush": false,
	"Mother": false,
	"Delirium": false,
	"Greed": false,
	"Greedier": false,
	"The Beast": false,
	"Mom's Heart": false,
	"Challenge": false
}
const bossHTMLtoJS = {
	"boss_satan": "Satan",
	"boss_lamb": "The Lamb",
	"boss_isaac": "Isaac",
	"boss_bluebaby": "???",
	"boss_megasatan": "Mega Satan",
	"boss_hush": "Hush",
	"boss_bossrush": "Boss Rush",
	"boss_mother": "Mother",
	"boss_delirium": "Delirium",
	"boss_greed": "Greed",
	"boss_greedier": "Greedier",
	"boss_beast": "The Beast",
	"boss_heart": "Mom's Heart",
	"boss_challenges": "Challenge"
}

let currentQuality = 0;

// Quality filter
quality.addEventListener("change", (event) => {
	currentQuality = event.target.value;
	renderItems();
});

// Adding a listener for every boss checkbox
for (let _boss in bossClears) {
	bossClears[_boss].addEventListener("change", (event) => {
		currentBoss[bossHTMLtoJS[bossClears[_boss].name]] = event.target.checked;
		renderItems();
	});
}

// itemBuilder: Creates and returns an item node that will then be used in renderItems
function itemBuilder(name, itemid, pickup, quality, moreDesc, unlock) {
	let itemNode = document.createElement("div");
	itemNode.className = "item-container";
	// Name
	let nameNode = document.createElement("p");
	nameNode.className = "item-title";
	let _name = document.createTextNode(name);
	nameNode.appendChild(_name);

	let qualityNode = document.createElement("p");
	qualityNode.className = "item-quality";
	let _quality = document.createTextNode("[" + quality + "]");
	qualityNode.appendChild(_quality);

	// Pickup
	let pickupNode = document.createElement("p");
	pickupNode.className = "item-pickup";
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
	itemNode.appendChild(qualityNode);
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
		popup.className = popup.style.height = popupBody.className = popupBody.innerHTML = "";
	else
		dismissClick = true;
});

// If the inner is clicked, keep it
popupBody.addEventListener("click", (event) => {
	dismissClick = false;
});

function renderDetails(name, itemid, pickup, quality, moreDesc, unlock) {
	popupBody.innerHTML = "";
	// I was going to just "re-use" the itemBuilder, but there would be too many problems with stuff like CSS conflicts and frankly it'd be easier to just re-make it
	let itemNode = document.createElement("div");
	itemNode.className = "popup-container";
	// Name
	let nameNode = document.createElement("p");
	nameNode.className = "popup-title";
	let _name = document.createTextNode(name + " [" + quality + "]");
	nameNode.appendChild(_name);

	// Pickup
	let pickupNode = document.createElement("p");
	pickupNode.className = "popup-pickup";
	let _pickup = document.createTextNode(pickup);
	pickupNode.appendChild(_pickup);

	// Description
	let descNode = document.createElement("p");
	descNode.className = "popup-pickup";
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
	popup.style.height = document.getElementById("item-view").clientHeight + "px";
}

// renderItems: Clears the current item container and rebuilds it provided the items match the filters in place
function renderItems() {
	itemsContainer.innerHTML = "";
	for (let item in Isaac.actives) {
		if (checkQuality(item, Isaac.actives) && checkBosses(item, Isaac.actives)) {
			let itemInfo = Isaac.actives[item];
			itemsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}
	// Render trinkets
	trinketsContainer.innerHTML = "";
	for (let item in Isaac.trinkets) {
		if (checkQuality(item, Isaac.trinkets) && checkBosses(item, Isaac.trinkets)) {
			let itemInfo = Isaac.trinkets[item];
			trinketsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}

	// Render challenges
	challengesContainer.innerHTML = "";
	for (let item in Isaac.usables) {
		if (checkQuality(item, Isaac.usables) && checkBosses(item, Isaac.usables)) {
			let itemInfo = Isaac.usables[item];
			challengesContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}
}

// checkQuality: Returns if $item is equal to or greater than the current selected quality slider
function checkQuality(item, source) {
	if (source[item].quality == "NA") return false;
	else return (parseInt(source[item].quality.split(" ")[1]) >= currentQuality)
}

// checkBosses: Returns if any of the currently active boss checkboxes are involved in the unlock of $item
function checkBosses(item, source) {
	// Platinum god is incredibly inconsistent with how it names things, for example "beating" is sometimes "defeating", bosses are sometimes spoilered (e.g. instead of saying "beating The Lamb" it'll say "beating the Dark Room")
	// ALSO it sometimes capitalizes stuff like "The" in The Chest, or sometimes it doesn't have a "the" at all depending on which description
	// As a result, I'm going with regex
	if (source[item].unlock.search("Unlock") < 0) return false;
	for (let boss in currentBoss) {
		if (currentBoss[boss]) { // If the current boss is actively checked...
			let regexStr = "(beating|defeating) (the )?"; // Platgod inconsistency failsafe
			switch (boss) { // More plat god inconsistency failsafes
				case "The Lamb":
					regexStr += "Lamb|Dark Room";
					break;
				case "???":
					regexStr += "Chest|\\?\\?\\?";
					break;
				default:
					regexStr += boss;
			}

			let regex = new RegExp(regexStr, "ig"); // Making it lowercase (you already know why)
			if (source[item].unlock.match(regex) != null) return true; // Return true if found
		}
	}
	return false;
}

renderItems();

