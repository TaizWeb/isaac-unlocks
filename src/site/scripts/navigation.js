// I don't want to talk about it.
// But basically this let me avoid making 13 different event listeners that do the same thing
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

// Navigation
const quality = document.getElementById("quality");
const qualityLabel = document.getElementById("quality-label");
const hamburger = document.getElementById("hamburger-toggle");
const navigation = document.getElementById("navigation");
const characterSelect = document.getElementById("characters-wrapper");
const poolSelect = document.getElementById("pools-wrapper");
let character = "";
let pool = "";
let currentQuality = 0;

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

// Same as characterSelect
poolSelect.addEventListener("click", (event) => {
	let pools = document.getElementsByName("pool-select");
	for (let i=0; i < pools.length; i++)
		if (pools[i].checked) pool = pools[i].value;
	renderItems();
});

// Swap between open/close on click
hamburger.addEventListener("click", (event) => {
	if (navigation.className == "open") {
		navigation.className = "close";
	}
	else {
		navigation.style.display = "flex";
		navigation.className = "open";
	}
});

// Finish getting rid of it at the end of it's css animation (see styles/navbar.css)
navigation.addEventListener("animationend", (event) => {
	if (navigation.className == "close")
		navigation.style.display = "none";
});

// Quality filter. On change, update the items
quality.addEventListener("change", (event) => {
	currentQuality = event.target.value;
	qualityLabel.innerHTML = "Quality (" + currentQuality + "+)";
	renderItems();
});

// Adding a listener for every boss checkbox (see? That monstrosity up top was *totally* worth it)
for (let _boss in bossClears) {
	bossClears[_boss].addEventListener("change", (event) => {
		currentBoss[bossHTMLtoJS[bossClears[_boss].name]] = event.target.checked;
		renderItems();
	});
}

