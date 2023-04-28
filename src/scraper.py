import json # Needed for converting a python dictionary to JSON
import bs4 # Needed for HTML scraping
from bs4 import BeautifulSoup # Same as bs4, but more consise

htmlFile = "platgod.html" # The HTML file to read
jsonFile = "isaac.json" # The JSON file to write
itemDB = {} # The dicitonary to hold the scraped information

# main: Reads the HTML and calls scrapeActives to edit them
def main():
	itemDict = []
	f = open(htmlFile, "r")
	itemHTML = f.read()
	soup = BeautifulSoup(itemHTML, "html.parser")
	itemsContainer = soup.find_all("div", {"class": "allitems"})
	scrapeActives(itemsContainer[0], "actives")
	scrapeActives(itemsContainer[1], "trinkets")
	scrapeActives(itemsContainer[2], "usables")

# scrapeActives: Takes the container variable (the parent of the item child nodes) and the term to use them under for the itemDB dictionary
def scrapeActives(container, DBterm):
	itemsList = container.find_all("li", {"class": "textbox"})
	itemDB[DBterm] = {}

	for item in itemsList:
		# Grab the exposed HTML data
		try: # If it reaches the end of the cards, or otherwise breaks, abort
			name = item.find_all("p", {"class": "item-title"})[0].contents[0]
			itemid = item.find_all("p", {"class": "r-itemid"})[0].contents[0]
		except:
			break

		# Failsafe for lack of pickup text
		if (item.find_all("p", {"class": "pickup"}) != []):
			pickup = item.find_all("p", {"class": "pickup"})[0].contents[0]
		else:
			pickup = "NA"

		# Failsafe for lack of quality (trinkets/pickups lack this)
		if (item.find_all("p", {"class": "quality"}) != []):
			quality = item.find_all("p", {"class": "quality"})[0].contents[0]
		else:
			quality = "NA"

		# If there's unlock requirements, append them. Except when there's not one, in which case this is annotated
		try:
			unlock = item.find_all("p", {"class": "r-unlock"})[0].contents[0]
		except:
			unlock = "Available from the start"

		# Hunting down the unmarked p tags with the expanded desc
		otherP = item.find_all("p")
		moreDesc = ""
		for p in otherP:
			# If the p tag isn't empty, and it's not already in one of the other variables...
			if (p.contents != [] and p.contents[0] != name and p.contents[0] != pickup	and p.contents[0] != itemid and p.contents[0] != quality and p.contents[0] != unlock and type(p.contents[0]) is bs4.element.NavigableString):
				moreDesc = moreDesc + p.contents[0] + "\n"

		# Building the table and populating it with the scraped data
		itemDB[DBterm][name] = {}
		itemDB[DBterm][name]["name"] = name
		itemDB[DBterm][name]["itemid"] = itemid
		itemDB[DBterm][name]["moreDesc"] = moreDesc
		itemDB[DBterm][name]["unlock"] = unlock

		# Failsafes
		if (pickup != "NA"):
			itemDB[DBterm][name]["pickup"] = pickup
		if (quality != "NA"):
			itemDB[DBterm][name]["quality"] = quality

		print(itemDB[DBterm][name]) # Get a visual representation in the terminal
	writeJSON(itemDB)

# writeJSON: Dumps the table provided to the file specified in jsonFile
def writeJSON(table):
	json_obj = json.dumps(table, indent=2)
	with open(jsonFile, "w") as outfile:
		outfile.write(json_obj)

main()

