//console.log(Isaac.actives["The Sad Onion"].moreDesc);
const quality = document.getElementById("quality");
const itemsContainer = document.getElementById("items");
let currentQuality = 0;

quality.addEventListener("change", (event) => {
	console.log(event.target.value);
	currentQuality = event.target.value;
	renderItems();
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
		//let itemQuality = Isaac.actives[item].quality.split(" ")[1];
		//if (Isaac.actives[item].quality
		if (checkQuality(item))
			itemsContainer.appendChild(itemBuilder(Isaac.actives[item].name, "","","","",""));
	}
}

function checkQuality(item) {
	if (Isaac.actives[item].quality == "NA") return false;
	else return (parseInt(Isaac.actives[item].quality.split(" ")[1]) >= currentQuality)
}

renderItems();

