from bs4 import BeautifulSoup
import json
import bs4

htmlFile = "platgod.html"
jsonFile = "isaac.json"
itemDB = {}

def main():
	itemDict = []
	f = open(htmlFile, "r")
	itemHTML = f.read()
	soup = BeautifulSoup(itemHTML, "html.parser")
	itemsContainer = soup.find_all("div", {"class": "allitems"})
	scrapeActives(itemsContainer[0], "actives")
	scrapeActives(itemsContainer[1], "trinkets")
	scrapeActives(itemsContainer[2], "usables")

def scrapeActives(container, DBterm):
	itemsList = container.find_all("li", {"class": "textbox"})
	itemDB[DBterm] = {}

	for item in itemsList:
		name = item.find_all("p", {"class": "item-title"})[0].contents[0]
		itemid = item.find_all("p", {"class": "r-itemid"})[0].contents[0]
		if (item.find_all("p", {"class": "pickup"}) != []):
			pickup = item.find_all("p", {"class": "pickup"})[0].contents[0]
		else:
			pickup = "NA"
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
			if (p.contents != [] and p.contents[0] != name and p.contents[0] != pickup	and p.contents[0] != itemid and p.contents[0] != quality and p.contents[0] != unlock and type(p.contents[0]) is bs4.element.NavigableString):
				moreDesc = moreDesc + p.contents[0] + "\n"
		itemDB[DBterm][name] = {}
		itemDB[DBterm][name]["name"] = name
		itemDB[DBterm][name]["itemid"] = itemid
		if (pickup != "NA"):
			itemDB[DBterm][name]["pickup"] = pickup
		if (quality != "NA"):
			itemDB[DBterm][name]["quality"] = quality
		itemDB[DBterm][name]["moreDesc"] = moreDesc
		itemDB[DBterm][name]["unlock"] = unlock
		print(itemDB[DBterm][name])
	writeJSON(itemDB)

def writeJSON(table):
	json_obj = json.dumps(table, indent=2)
	with open(jsonFile, "w") as outfile:
		outfile.write(json_obj)

main()

