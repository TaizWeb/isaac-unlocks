// checkQuality: Returns if $item is equal to or greater than the current selected quality slider
function checkQuality(item, source) {
	if (source[item].quality == "NA") return false;
	else return (parseInt(source[item].quality.split(" ")[1]) >= currentQuality)
}

// checkCharacter: returns true if the character is in the item's description via regex magic
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

// checkPools: Returns true if the item is involved in any pools
function checkPools(item, source) {
	if (pool == "") return true;
	if (source[item].unlock.search("Unlock") < 0) return false;
	return (getPools(source[item].moreDesc).indexOf(pool) != -1);
}

