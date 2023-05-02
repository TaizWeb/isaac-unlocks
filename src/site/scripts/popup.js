// Popup code
let popup = document.getElementById("popup");
let popupBody = document.getElementById("popup-body");
let dismissClick = true;
let detailsPopup = false;

// getPools: Tear apart the description to remove the pools. If it doesn't have them, say so
function getPools(descStr) {
	let splitStr = descStr.split("\nItem Pool:");
	if (splitStr[1] == undefined) return "None";
	return descStr.split("\nItem Pool:")[1].split("*")[0];
}

// If the outside area is clicked, dismiss the entire thing
popup.addEventListener("click", (event) => {
	if (dismissClick) {
		popupBody.className = popupBody.innerHTML = "";
		popup.className = "inactive";
	}
	else
		dismissClick = true;
});

// Actually removing the popup but only when the css animation is done. See styles/popup.css
popup.addEventListener("animationend", (event) => {
	if (popup.className == "inactive") {
		popup.style.height = "0px";
	}
});

// If the inner is clicked, keep it
popupBody.addEventListener("click", (event) => {
	dismissClick = false;
});

// Create the HTML to hold the popup's text and body
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
	let _desc = document.createTextNode(moreDesc.split("\nType")[0].split("*, ")[0]); // Removing pools/tags from item
	descNode.appendChild(_desc);
	descNode.className = "item-desc";

	// Pools
	let poolNode = document.createElement("p");
	let _pool = document.createTextNode("Pools: " + getPools(moreDesc));
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

