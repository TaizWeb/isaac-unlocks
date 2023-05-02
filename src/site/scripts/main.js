// Main content
const itemsContainer = document.getElementById("items");
const trinketsContainer = document.getElementById("trinkets");
const challengesContainer = document.getElementById("challenges");

// itemBuilder: Creates and returns an item node that will then be used in renderItems
function itemBuilder(name, itemid, pickup, quality, moreDesc, unlock) {
	let itemNode = document.createElement("div");
	itemNode.className = "item-container";

	// Name
	let nameNode = document.createElement("p");
	nameNode.className = "item-title";
	let _name = document.createTextNode(name);
	nameNode.appendChild(_name);

	// Quality
	let qualityNode = document.createElement("p");
	qualityNode.className = "item-quality quality-" + quality.split(" ")[1];
	let _quality = document.createTextNode("[" + quality + "]");
	qualityNode.appendChild(_quality);

	// Pickup
	let pickupNode = document.createElement("p");
	pickupNode.className = "item-pickup";
	let _pickup = document.createTextNode(pickup);
	pickupNode.appendChild(_pickup);

	// Unlock
	let unlockNode = document.createElement("p");
	let _unlock = document.createTextNode(unlock);
	unlockNode.appendChild(_unlock);

	// Appending them all to itemNode and returning it
	itemNode.appendChild(nameNode);
	itemNode.appendChild(qualityNode);
	itemNode.appendChild(pickupNode);
	itemNode.appendChild(unlockNode);

	itemNode.addEventListener("click", (event) => {
		renderDetails(name, itemid, pickup, quality, moreDesc, unlock);
		detailsPopup = true;
	});
	return itemNode;
}

// renderItems: Clears the current item container and rebuilds it provided the items match the filters in place
function renderItems() {
	// Clear it out before rendering the new item list
	itemsContainer.innerHTML = "";

	// Render actives
	for (let item in Isaac.actives) {
		if (checkQuality(item, Isaac.actives) && checkBosses(item, Isaac.actives) && checkCharacter(item, Isaac.actives) && checkPools(item, Isaac.actives)) {
			let itemInfo = Isaac.actives[item];
			itemsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}

	// Render trinkets
	trinketsContainer.innerHTML = "";
	for (let item in Isaac.trinkets) {
		if (checkQuality(item, Isaac.trinkets) && checkBosses(item, Isaac.trinkets) && checkCharacter(item, Isaac.trinkets) && checkPools(item, Isaac.actives)) {
			let itemInfo = Isaac.trinkets[item];
			trinketsContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}

	// This actually isn't an O(n^3) runtime. If checkQuality fails, none of the other checks will run. So I don't feel bad about doing it in this fashion
	// I will admit, with more planning I would've just brewed up a clever regex statement and saved a lot of code, but whatever, it works.
	challengesContainer.innerHTML = "";
	for (let item in Isaac.usables) {
		if (checkQuality(item, Isaac.usables) && checkBosses(item, Isaac.usables) && checkCharacter(item, Isaac.usables) && checkPools(item, Isaac.actives)) {
			let itemInfo = Isaac.usables[item];
			challengesContainer.appendChild(itemBuilder(itemInfo.name, "",itemInfo.pickup,itemInfo.quality,itemInfo.moreDesc,itemInfo.unlock));
		}
	}
}

renderItems();

