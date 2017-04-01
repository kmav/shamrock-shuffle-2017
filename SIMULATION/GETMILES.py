#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import random
import math
import sys
### mysql connection

groupedNumber = 10
minuteInterval=2
con = mdb.connect(host='localhost',user='rsquared11',db='shamrock2017')
#con = mdb.connect(host='localhost',user='mazhang',db='c9')
cur = con.cursor(mdb.cursors.DictCursor)



class Runner(object):
    def __init__(self,number,wave,corral,stdDev):
        self.id=number
        self.wave=wave
        self.corral = corral
        self.stdDev = stdDev 
        self.position = -1
        self.started = False
        self.finished = False

txt = "raceMinute,started,atMile0,atMile1,atMile2,atMile3,atMile4,atMile5,atMile6,atMile7,atMile8,atMile9,atMile10,atMile11,atMile12,atMile13,atMile14,atMile15,atMile16,atMile17,atMile18,atMile19,atMile20,atMile21,atMile22,atMile23,atMile24,atMile25,atMile26,finished\n"
altTxt = "Mile,Minute,Runners\n"
altTxtH = "Mile,Minute,Runners\n"

for minute in range(0,251,minuteInterval):
	sql = "SELECT * FROM MarathonRunners where minute="+str(minute)
	print sql
	
	cur.execute(sql)
	rows = cur.fetchall()
	print "fetching from database ...   ",
	#now go row by row 
	RunnersArray = []
	j=0
	for row in rows:
		j+=1
		# print j,
		runner = {}
		runner['runnerId']	= int(row["runnerId"])
		runner['minute']	= int(row["minute"])
		runner['started'] 	= int(row["started"])
		runner['finished'] 	= int(row["finished"])
		runner['corral'] 	= int(row["corral"])
		runner['startTime'] = float(row["startTime"])
		runner['position']	= float(row["position"])
		#print runner['position']
		runner['deviation']	= float(row["deviation"])
	
		RunnersArray.append(runner)
		# print RunnersArray[-1]
	print "done"
	##now we need to calculate how's where
	
	# Segment[i] = realData[i] - realData[i+1]

	##now simulation data
	simData = [0]*27
	started = 0
	finished = 0
	
	# file = open('outPositions.csv','w')
	
	for r in RunnersArray:
		if r['finished']==1:
			finished += groupedNumber
			started += groupedNumber
		elif r['started']==1:
			started += groupedNumber
			#simData[0]+=4
			pos = float(r['position'])
			# file.write(str(pos)+'\n')
			mile = int(float(pos) / 1.609)
			simData[mile] += groupedNumber

	txt +=  str(minute)+','+str(started)
	for each in simData:
		txt+= ','+str(each)
	txt += ','+str(finished)
	txt+='\n'
	
	for i in range(26):
		altTxt += str(i)+','+str(minute)+','+str(simData[i])+'\n'
	

		
file = open("../data/DensitiesGETMILES.csv",'w');
file2 = open("../data/RunnerData.csv",'w');	
file.write(txt)
file2.write(altTxt)
