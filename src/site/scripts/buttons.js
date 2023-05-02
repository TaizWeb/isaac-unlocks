// Navigation Buttons
const bossAll = document.getElementById("boss_all");
const taintedToggle = document.getElementById("tainted-toggle");
const characterDeselect = document.getElementById("character-deselect");
const poolDeselect = document.getElementById("pool-deselect");

// This toggles every boss checkbox at once, and tells their listener that they've been updated
bossAll.addEventListener("click", (event) => {
	for (let _boss in bossClears) {
		bossClears[_boss].checked = !bossClears[_boss].checked;
		bossClears[_boss].dispatchEvent(new Event("change", {"bubbles":true}));
	}
});

// This is a cheap way of converting the existing radio buttons to tainteds
taintedToggle.addEventListener("click", (event) => {
	let characters = document.getElementsByName("character-select");	
	for (let i=0; i < characters.length; i++) { // This could be more efficient rather than checking 17 times
		// Remove tainted
		if (characters[i].value.split(" ")[0] == "Tainted") {
			characters[i].value = characters[i].value.split("Tainted ")[1];
			characters[i].labels[0].innerHTML = characters[i].value;
		// Add tainted
		} else {
			characters[i].labels[0].innerHTML = "T. " + characters[i].value;
			characters[i].value = "Tainted " + characters[i].value;
		}
	}
});

// Rolls through every character radio button and makes sure it's off
// This could've just to turn off the one active one, but iirc I originally intended (and may still) for multiple to be selectable at once
characterDeselect.addEventListener("click", (event) => {
	let characters = document.getElementsByName("character-select");
	for (let i=0; i < characters.length; i++) {
		characters[i].checked = false;
		character = "";
	}
	renderItems();
});

// Same as characterDeselect
poolDeselect.addEventListener("click", (event) => {
	let pools = document.getElementsByName("pool-select");
	for (let i=0; i < pools.length; i++) {
		pools[i].checked = false;
		pool = "";
	}
	renderItems();
});

