#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import random
import math
import sys
### mysql connection

#con = mdb.connect(host='localhost',user='mazhang',db='c9')

#connect to the sql database
#con = mdb.connect(host='mazhang-chicagomarathon2016-1689696', user='mazhang', db='c9')
con = mdb.connect(host='localhost',user='root',passwd='mar@1h0niem5', db='shamrock2017')
#DictCursor returns a dictionary with keys
cur = con.cursor(mdb.cursors.DictCursor)

#connections
currentTemp = 0

class Runner(object):
	#corrals are subgroups of waves
    def __init__(self,number,wave,corral,stdDev):
        self.id=number
        self.wave=wave
        self.corral = corral
        self.stdDev = stdDev 
        self.position = -1
        self.started = False
        self.finished = False

#getSpeed takes in a runner object
def getSpeed(runner):
    TEMP = float(currentTemp)
    DISTANCE = float(runner['position'])
    corral = runner['corral']
    speed = 0.0

    #first to go, awd (athletes with disability)
    if corral == 0:
        speed = 5.33
    #american development
    if corral == 2:
        corral = 1
        speed = 9.55

    #elites
    if corral== 1 : 
        if DISTANCE<10: 
                speed = (9.64419873876+(-0.000931700630522)*TEMP) + (0.0249328163757 + (-0.000256469719805)* TEMP ) * DISTANCE 
        if DISTANCE>=10: 
                speed =  (9.83017994657+(0.00489768256501)*TEMP) + (0.00444863374136 + (-0.000604232629418)* TEMP ) * DISTANCE 
    #a
    if corral== 3 : 
            if DISTANCE<10: 
                    speed = (8.63220503083+(-0.00382457306738)*TEMP) + (0.0193243058485 + (-6.82844351124e-05)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (8.68436001534+(0.00660202442628)*TEMP) + (0.00916185756893 + (-0.000766755226609)* TEMP ) * DISTANCE 

    if corral== 4 : 
            if DISTANCE<10: 
                    speed = (7.98493369699+(-0.00453265898854)*TEMP) + (0.0267840268359 + (-0.000131032547266)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (8.19300906124+(0.00444016642186)*TEMP) + (0.00491892840694 + (-0.000745671376061)* TEMP ) * DISTANCE 
    if corral== 5 : 
            if DISTANCE<10: 
                    speed = (7.52058024011+(-0.00480665269828)*TEMP) + (0.0279470019205 + (-0.000158780053557)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (7.76181966951+(0.00412169288934)*TEMP) + (0.00337916243936 + (-0.000764865156778)* TEMP ) * DISTANCE 
    if corral== 6 : 
            if DISTANCE<10: 
                    speed = (7.17481729795+(-0.00438339369739)*TEMP) + (0.0254197458153 + (-0.000107657154661)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (7.37919414097+(0.00544428219455)*TEMP) + (0.00640028541955 + (-0.000838846452681)* TEMP ) * DISTANCE 
    if corral== 7 : 
            if DISTANCE<10: 
                    speed = (6.93550624774+(-0.00374942346129)*TEMP) + (0.0308542405954 + (-0.000210439989279)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (7.11186613731+(0.00695459217648)*TEMP) + (0.0109394824862 + (-0.000946642791164)* TEMP ) * DISTANCE 
    if corral== 8 : 
            if DISTANCE<10: 
                    speed = (6.73753769292+(-0.00393604373944)*TEMP) + (0.0354416751432 + (-0.00032493723748)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (7.14188096529+(0.00326161798086)*TEMP) + (-0.00028552029072 + (-0.000809021936703)* TEMP ) * DISTANCE 
    if corral== 9 : 
            if DISTANCE<10: 
                    speed = (6.33105080709+(-0.00338678012864)*TEMP) + (0.0257720634635 + (-0.000372695303258)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (6.91431918238+(-0.00108374220717)*TEMP) + (-0.0131216390398 + (-0.000597959197359)* TEMP ) * DISTANCE 
    if corral== 10 : 
            if DISTANCE<10: 
                    speed = (6.00623980025+(-0.00283603398457)*TEMP) + (0.0128652191841 + (-0.000425523726021)* TEMP ) * DISTANCE 
            if DISTANCE>=10: 
                    speed =  (6.5386297425+(-0.00233551710924)*TEMP) + (-0.0176116607083 + (-0.000520283204613)* TEMP ) * DISTANCE 
    if corral== 11 : 
            if DISTANCE<10: 
                    speed = (5.93291719084+(-0.00322367137615)*TEMP) + (0.000500343064203 + (-0.000389975526887)* TEMP ) * DISTANCE 
            if DISTANCE>=10:
                    speed =  (6.5121368141+(-0.00486876666938)*TEMP) + (-0.0226966469797 + (-0.000444260057232)* TEMP ) * DISTANCE 
    if corral== 12 : 
            if DISTANCE<10: 
                    speed = (5.73527217176+(-0.00461414224181)*TEMP) + (-0.0130848767638 + (-0.000499228830686)* TEMP ) * DISTANCE 
            if DISTANCE>=10:
                    speed =  (6.25493721077+(-0.00977631228215)*TEMP) + (-0.0301529659912 + (-0.000266797577107)* TEMP ) * DISTANCE 
    return 0.93*speed+runner['deviation']

    pass


def GetDifferences(simulation,real):
	
	#we know, in simulation, what we have for each segment
	#we know, in real, how many people passed each 5k mark at any time
	
	# thus, we can simply 'pull back' or 'push forward' as needed 
	
	differences = [0]*len(simulation)
	for i in range(len(simulation)):
		differences[i] = real[i] - simulation[i]
		
	# now we know how many we have to change
	# if number is positive, then more people have passed this point than in the simulation
	# which means we're going slow, meaning we have to pull people from behind
	# if number is negative, then the simulation has more people ahead (going faster)
	# so we have to move the runners back (before they passed)
	
	return differences
	
	pass

def main():

############DELETE v ############
	simulation = 0
	if simulation==0:
############DELETE ^ ############

		#ask for temperature and minute of the race
		minute = int(sys.argv[1])
		
		# add = minute%4;
		# minute = minute + (4-add)
		# if minute%2==1:
		# 	minute +=1
			
		temperature = int(sys.argv[2])
		currentTemp = temperature
		
		realData = [0]*10
	
		print "----- starting -----"
		print "MINUTE: "+str(minute)
		print "TEMPERATURE: "+str(temperature)+" F"
		print "\n"
		print "---- input data ----"
	
		pp = raw_input("EXIT, PRESS 'q', CONTINUE, PRESS 'c' ")
		if (pp=='q'):
			return
	
		print "\n"
	
######OPPORTUNITY FOR IMPROVEMENT: AUTOMATE SCRAPING OF THIS DATA######
		#input by hand the real data to compare the simulation to the real 5k counts in order
		#to adjust accordingly
		#realData holds the number of cumulative runners at each 5k count
		realData = [0]*10
		realData[0] = int(input("Input number of runners started"))
		for i in range(1,9):
			realData[i] = int(input("Input cumulative number of runners at "+str(i*5)+"k"))
		realData[9] = int(input("Input number of runners finished"))
	
		#now verify information
		i=0
		print "\nINFORMATION VERIFICATION:"
		for number in realData:
			print "\t "+str(i)+"k - "+str(number)
			i+=1
	
		decision = raw_input("Correct? y/n")
		if (decision=="n"):
			return
		
		

	## now we need to know how many people are at each spot
	## and we also neeed to figure out the moving of people

	# we could load all the runners
	# create a 2d multidimenstional array of n runners
	# each array element has
		# runner id
		# runner position
		# runner corral
		# runner started
		# runner finished
		# runner startTime
		# runner deviation

	# that way we can sort a lot of things easily
		# get only the ones we need given on positions
		# get corral data
		# get other things

	sql = "SELECT * FROM MarathonRunners where minute="+str(minute)
	print sql
	cur.execute(sql)

	rows = cur.fetchall()

	print "fetching from database ...   ",
	#now go row by row (RunnersArray is a list of dictionaries of individual runners)
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
	##now we need to calculate where runners are
	#realSegment: number of runners between each 5k count
	#10 slots because there are 8.2 5k's in a marathon, therefor 9 slots, plus 1 slot for
	#	those who finished the race
	realSegment = [0]*10
	#calculate the differences 
	for i in range(len(realSegment)-1):
		realSegment[i] = realData[i] - realData[i+1]

	##now simulation data
	simData = [0]*10
	
	#RunnersArray holds a list of dictionaries of runners from MarathonRunners.sql
	for r in RunnersArray:
		if r['finished']==1:
			#Since 1 runner represents "groupedNumber" (we set groupedNumber=40), then when
			#one simulation runner finishes, that implies 40 for the simulation.
			simData[-1] += groupedNumber
		if r['started']==1:
			#simData[0]+=4
			pos = float(r['position'])
			for i in range(9):
				#so if the runner position is greater than the 5k segment, add "40" runners to that 5k segment index
				#aka finding cumulative # of simulated runners passing the 5k segment
				if float(pos)>float(5.00*float(i)):
					simData[i]+=groupedNumber

######WHERE WE CAN PUT SANITY CHECKS INTO PLACE######
	for i in range(len(realSegment)-1):
		print str(i*5)+"k :\t"+str(simData[i])+'\t'+str(realData[i])

	print "finished \t"+str(simData[-1])+'\t'+str(realData[-1])
	
	#movements: array of differences between simulated and real data at each segment
	movements = GetDifferences(simData,realData)

	print movements

	# now, we need to re-order the data and move some front and back
	#sort by position
	# >>> sorted(student_objects, key=lambda student: student.age)   # sort by age

	RunnersSorted = sorted(RunnersArray, key=lambda runner: runner['position'], reverse=True) # sort by position
	
	
	
	
	
	
	
	#now we have to move them to a given point, or change their speed

	# if number is positive, then more people have passed this point than in the simulation
	# which means we're going slow, meaning we have to pull people from behind
	# if number is negative, then the simulation has more people ahead (going faster)
	# so we have to move the runners back (before they passed)
	simData1 = simData
	
	#Loop through each 5k count
	for s in range(10):
		#movements holds the differences in number of people at each 5k count
		movements = GetDifferences(simData1,realData)
		print movements
		print "Changing segment",s
		# if s=0, number of people past km 0 (started)
		#divide by groupedNumber because simData and realData has the total number of people
		#	not the simulated number of people
		difference = movements[s]/groupedNumber
		moved = []
		if difference>0:
			# push people to go faster (fwd) so pull from behind
			# behind is the list of runners that need to have their positions changed
			behind = [x for x in RunnersSorted if (x['position']<5.00*s)]
			
			# we can only move those we still have
			# moving is the # of people we want to move ahead to keep up with the real data
			moving = min(difference,len(behind))
			
			#already sorted decreasing in theory
			#takes "moving" # of earliest runners and moves them ahead
			for i in range(moving):
				behind[i]['position'] = (s+1)*5.00
				moved.append(behind[i])
				
		if difference<0:
			print "Pushing"+str(difference)+" people back"
			#push people back (slower) so push back from this segment to start of segment
			ahead = [x for x in RunnersSorted if (x['position']>(s*5.00)) ]
			
			#we can only move those that we have
########LOOKS LIKE DIFFERENCE IS ALWAYS THE MINIMUM????##########
			moving = min(difference,len(ahead))
			print "Can move: ",moving
			moving = -1*moving
			
			ahead_sorted = sorted(ahead, key=lambda runner: runner['position']) #sort increasing
			
			#looks like we are taking the slowest runners of that 5k and moving them back on 5k
			for i in range(moving):
				#move those to the beginning
				if (i < len(ahead_sorted)):
					ahead_sorted[i]['position'] = s*5.00-.001
					moved.append(ahead_sorted[i])
				#print moved[-1]['position']
		
		#now we need to replace them in the real RunnersSorted array
		k=-1
		print "\t\t Input into real array"
		for each in RunnersSorted:
			k+=1
			for m in moved:
				if each['runnerId']==m['runnerId']:
					RunnersSorted[k]['position'] = m['position']
					if float(RunnersSorted[k]['position'])>0.00:
						RunnersSorted[k]['started']=1
					else:
						RunnersSorted[k]['started']=0
					
		simData1 = [0]*10

#same as line 250
		for r in RunnersSorted:
			if r['finished']==1:
				simData1[-1] += groupedNumber
			if r['started']==1:
				#double check those who finished
				if r['position']>42.2 and r['finished']==0:
					r['finished'] = 1
					simData1[-1] += groupedNumber
				pos = float(r['position'])
				# file.write(str(pos)+'\n')
				for i in range(9):
					if float(pos)>float(5.00*float(i)):
						simData1[i]+=groupedNumber

#print out simulation and real data
	for i in range(len(realSegment)-1):
		print str(i*5)+"k :\t"+str(simData1[i])+'\t'+str(realData[i])

	print "finished \t"+str(simData1[-1])+'\t'+str(realData[-1])

####### now to plot mile segment data (exact same code as for km data)

	mileData = [0]*27
	for r in RunnersArray:
			if r['finished']==1:
				mileData[-1] += groupedNumber
			if r['started']==1:
				if r['position']>42.2 and r['finished']==0:
					r['finished'] = 1
					mileData[-1] += groupedNumber
				pos = float(r['position'])
				# file.write(str(pos)+'\n')
				for i in range(27):
					if float(pos)>float(1.609*float(i)):
						mileData[i]+=groupedNumber

	# number of people in each individual mile	
	inMile = [0]*27
	for i in range(26):
		inMile[i] = mileData[i] - mileData[i+1]
		
	print inMile
	
	## NOW WE NEED TO CHANGE THESE PEOPLE'S POSITIONS FOR THE NEXT 30 MINUTES
	for t in range(2,21,minuteInterval):
		#perform the 'moving of people'
		#minute refers the the console input in line 142
		currentTime = minute+t
		sql = ""
		print "Updating minute"+str(currentTime)

		# start runners if at the correct time	
		for i in range(len(RunnersSorted)):
			runner = RunnersSorted[i]
			if runner['started']==0:
				#start the runner if the current time already passed
				if runner['startTime'] < currentTime:
					RunnersSorted[i]['started'] = 1
					RunnersSorted[i]['position'] = 0.00
					
		#Now go through and update positions
		print "changing positions"
		for i in range(len(RunnersSorted)):
			#print i,
			runner = RunnersSorted[i]
			#if runner is running
			if (runner['started']==1 and runner['finished']==0):
				#Updates positions based on speed and the minuteInterval
				position = runner['position']
				#getSpeed is a function written above
				speedKmPerMin = float(getSpeed(runner)) * 1.609/60
				position = position + speedKmPerMin*(float(minuteInterval))
				#If past the finished line, mark the runner as finished
				if position>42.2:
					position = 42.2
					RunnersSorted[i]['finished'] = 1
				#Otherwise, update the position
				RunnersSorted[i]['position'] = position
				
				#Get these values from the runner
				started = RunnersSorted[i]['started']
				finished = RunnersSorted[i]['finished']
				position = RunnersSorted[i]['position']
				runnerId = RunnersSorted[i]['runnerId']
				
				#Then, update these values for the runner in the MarathonRunners database
				#The database is huge, has an entry for every runner every minute
				sql = "UPDATE MarathonRunners SET started="+str(started)+", finished="+str(finished)+", position="+str(position)+" where runnerId="+str(runnerId)+" and minute="+str(currentTime)+" ; \n"
				#print sql
				cur.execute(sql)
				con.commit()
			
		
	# file = open("sqlUpdate.sql",'q)
	# file.write(sql)
	pass

groupedNumber = 40
minuteInterval = 2

if __name__=='__main__':
	main()
	
	
# minute=50
# INFORMATION VERIFICATION:
#          0k - 34396
#          1k - 15580
#          2k - 3728
#          3k - 60
#          4k - 0
#          5k - 0
#          6k - 0
#          7k - 0
#          8k - 0
#          9k - 0
