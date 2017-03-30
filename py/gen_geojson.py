file = open("locations.csv",'r')
outfile = open('paths.geojson','w')

lines_array = []
lines_array = file.read().split('\r')
for i in range(len(lines_array)):
	lines_array[i] = lines_array[i].split(',')

print len(lines_array)
print lines_array[4]
#get rid of the first one
lines_array = lines_array[1:]
print len(lines_array)
#now write the paths 
strng = """
[
"""
for i in range(0,len(lines_array)-1):
	strng += """
		{
			"type": "Feature",
			"properties": {
				"stroke": "#ff2600",
				"stroke-width": 2,
				"stroke-opacity" :1,
				"status":"Green",
				"name": "path""" + str(i) + """"
			},
			"geometry": {
				"type": "LineString",
				"coordinates":[
					["""+str(lines_array[i][1])+","+str(lines_array[i][2])+"""],
					["""+str(lines_array[i+1][1])+","+str(lines_array[i+1][2])+"""]
				]
			}
		}"""
	if i<(len(lines_array)-2):
		strng+=","

#now finish it
strng+="""
	]
"""

outfile.write(strng);
