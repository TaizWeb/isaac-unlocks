// Main content
const itemsContainer = document.getElementById("items");
const trinketsContainer = document.getElementById("trinkets");
const challengesContainer = document.getElementById("challenges");

// Navigation
const quality = document.getElementById("quality");
const qualityLabel = document.getElementById("quality-label");
const hamburger = document.getElementById("hamburger-toggle");
const navigation = document.getElementById("navigation");
const characterSelect = document.getElementById("characters-wrapper");
const poolSelect = document.getElementById("pools-wrapper");
let character = "";
let pool = "";

// Navigation Buttons
const bossAll = document.getElementById("boss_all");
const taintedToggle = document.getElementById("tainted-toggle");
const characterDeselect = document.getElementById("character-deselect");
const poolDeselect = document.getElementById("pool-deselect");

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

// Everytime the radio buttons are hit, update the current value
characterSelect.addEventListener("click", (event) => {
	// Look, I know I'm writing this exact line in multiple places,
	// but I fear if it's dynamic it'll hold the "old" values if tainted is toggled
	// May not, haven't bothered checking
	let characters = document.getElementsByName("character-select");
	for (let i=0; i < characters.length; i++)
		if (characters[i].checked) character = characters[i].value;
	renderItems();
});

poolSelect.addEventListener("click", (event) => {
	let pools = document.getElementsByName("pool-select");
	for (let i=0; i < pools.length; i++)
		if (pools[i].checked) pool = pools[i].value;
	renderItems();
});

characterDeselect.addEventListener("click", (event) => {
	let characters = document.getElementsByName("character-select");
	for (let i=0; i < characters.length; i++) {
		characters[i].checked = false;
		character = "";
	}
	renderItems();
});

poolDeselect.addEventListener("click", (event) => {
	let pools = document.getElementsByName("pool-select");
	for (let i=0; i < pools.length; i++) {
		pools[i].checked = false;
		pool = "";
	}
	renderItems();
});

taintedToggle.addEventListener("click", (event) => {
	let characters = document.getElementsByName("character-select");	
	for (let i=0; i < characters.length; i++) { // This could be more efficient rather than checking 17 times
		if (characters[i].value[1] == ".") {
			characters[i].value = characters[i].value.slice(3);
			characters[i].labels[0].innerHTML = characters[i].value;
		} else {
			characters[i].value = "T. " + characters[i].value;
			characters[i].labels[0].innerHTML = characters[i].value;
		}
	}
});

hamburger.addEventListener("click", (event) => {
	if (navigation.style.display == "flex")
		navigation.style.display = "none";
	else
		navigation.style.display = "flex";
});

bossAll.addEventListener("click", (event) => {
	for (let _boss in bossClears) {
		bossClears[_boss].checked = !bossClears[_boss].checked;
		bossClears[_boss].dispatchEvent(new Event("change", {"bubbles":true}));
	}
});

let currentQuality = 0;

// Quality filter
quality.addEventListener("change", (event) => {
	currentQuality = event.target.value;
	qualityLabel.innerHTML = "Quality (" + currentQuality + "+)";
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
	qualityNode.className = "item-quality quality-" + quality.split(" ")[1];
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

function getPools(descStr) {
	return descStr.split("\nItem Pool:")[1].split("*")[0];
}

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
	nameNode.className = "popup-title quality-" + quality.split(" ")[1];
	let _name = document.createTextNode(name);
	nameNode.appendChild(_name);

	// Pickup
	let pickupNode = document.createElement("p");
	pickupNode.className = "popup-pickup";
	let _pickup = document.createTextNode(pickup);
	pickupNode.appendChild(_pickup);

	// Description
	let descNode = document.createElement("p");
	descNode.className = "popup-pickup";
	let _desc = document.createTextNode(moreDesc.split("\nType")[0].split("*, ")[0]); // Removing pools/tags from item
	descNode.appendChild(_desc);
	descNode.className = "item-desc";

	// Pools
	let poolNode = document.createElement("p");
	poolNode.className = "popup-pools";
	let _pool = document.createTextNode("Pools: " + moreDesc.split("\nItem Pool:")[1].split("*")[0]); // Removing pools/tags from item
	poolNode.appendChild(_pool);
	poolNode.className = "item-pools";

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
	popupBody.appendChild(poolNode);

	popup.className = popupBody.className = "active";
	popup.style.height = document.getElementById("item-view").clientHeight + "px";
}

// renderItems: Clears the current item container and rebuilds it provided the items match the filters in place
function renderItems() {
	itemsContainer.innerHTML = "";
	for (let item in Isaac.actives) {
		if (checkQuality(item, Isaac.actives) && checkBosses(item, Isaac.actives) && checkCharacter(item, Isaac.actives) && checkPools(item, Isaac.actives)) {
			let itemInfo = Isaac.actives[item];
			itemsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}
	// Render trinkets
	trinketsContainer.innerHTML = "";
	for (let item in Isaac.trinkets) {
		if (checkQuality(item, Isaac.trinkets) && checkBosses(item, Isaac.trinkets) && checkCharacter(item, Isaac.trinkets)) {
			let itemInfo = Isaac.trinkets[item];
			trinketsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}

	// Render challenges
	challengesContainer.innerHTML = "";
	// This actually isn't an O(n^3) runtime. If checkQuality fails, none of the other checks will run. So I don't feel bad about doing it in this fashion
	// I will admit, with more planning I would've just brewed up a clever regex statement and saved a lot of code, but whatever, it works.
	for (let item in Isaac.usables) {
		if (checkQuality(item, Isaac.usables) && checkBosses(item, Isaac.usables) && checkCharacter(item, Isaac.usables)) {
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

function checkCharacter(item, source) {
	// Platinum (oh my fucking) God has done it again and sometimes has Maggy as Magdalene, uses with/as <character> interchangably, ???/Blue baby, and other weird stuff with their dataset.
	// THIS is why I'm making this. Imagine looking on platinum god for Maggy unlocks and wondering why half of them are missing. Or looking for Isaac and seeing all the boss' unlocks and the character Isaac's unlocks. ornotbeingabletocombinethemheh
	// I will say props to them on the tag system though, that must've came in clutch before EID released
	// You're probably really glad you read the sourcecode now, if for nothing else, my snide remarks
	if (character == "") return true; // If character isn't selected, return true;
	// Including the following for shits and giggles, although since checkBosses runs first this SHOULD never return false. But you never know with browser compatibility, minifying, or whatever else is done with this code later on
	if (source[item].unlock.search("Unlock") < 0) return false;
	let regexStr = "(with|as) (the )?"; // Should cover the with/as and "The" Lost/Forgotten
	// Gross? Very. I'm not taking chances.
	if (character == "Magdalene" || character == "Maggy") regexStr += "Magdalene|Maggy";
	else if (character == "???" || character == "Blue Baby") regexStr += "\\?\\?\\?|Blue Baby";
	else if (character == "Tainted Magdalene" || character == "Tainted Maggy") regexStr += "Tainted Magdalene|Tainted Maggy";
	else if (character == "Tainted ???" || character == "Tainted Blue Baby") regexStr += "Tainted \\?\\?\\?|Tainted Blue Baby";
	else regexStr += character;

	let regex = new RegExp(regexStr, "ig"); // Making it lowercase (you already know why)
	if (source[item].unlock.match(regex) != null) return true; // Return true if found
	else return false;
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
				case "Hush":
					regexStr += "Hush|Blue Womb";
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

function checkPools(item, source) {
	if (pool == "") return true;
	if (source[item].unlock.search("Unlock") < 0) return false;
	return (getPools(source[item].moreDesc).indexOf(pool) != -1);
}

renderItems();

