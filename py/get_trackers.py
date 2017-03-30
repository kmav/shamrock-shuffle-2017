from lxml import html
import requests
import MySQLdb

import json

page = requests.get('http://econpy.pythonanywhere.com/ex/001.html')
tree = html.fromstring(page.text)

# #This will create a list of buyers:

url = 'https://gateway.landairsea.com/tmmgw/tmmgw.asmx/Poll?cmd={%22usr%22:%22cemevent%22,%22pwd%22:%22raceday%22}'

page = requests.get(url)
tree = html.fromstring(page.content)
# # print tree

jsonText =  tree.text_content()

parsed_json = json.loads(jsonText)
print "\n\n\n --- \n\n\n "
print "NAME \t DEVICE ID"
for device in parsed_json["devices"]:
	print device["name"],'\t',device["id"] ," - ",device["tstamp"],':',device["lat"],',',device["lon"]


con = MySQLdb.connect(host="bpeynetti-chicagomarathon2015-1689696",user="bpeynetti",db="c9" )

 # prepare a cursor object using cursor() method
cursor = con.cursor()

# # execute SQL query using execute() method.
# cursor.execute("SELECT VERSION()")

# # Fetch a single row using fetchone() method.
# data = cursor.fetchone()

# print "Database version : %s " % data

# # disconnect from server
# db.close()



#text = tree.xpath('//span[@class="text"]/text()')

#print " text ",text



# buyers = tree.xpath('//div[@title="buyer-name"]/text()')
# #This will create a list of prices
# prices = tree.xpath('//span[@class="item-price"]/text()')

# print 'Buyers: ', buyers
# print 'Prices: ', prices