#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import random
import math
import calcDrops

dropoutPerHalfHour = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
droputDone = [0]*len(dropoutPerHalfHour)

speeds = {}
totalMinutes = 250

class Runner(object):
    def __init__(self,number,corral,deviation):
        self.id=number
        self.corral = corral
        self.deviation = deviation 
        self.position = -1
        self.started = False
        self.finished = False
        self.dropout = 0
    def printMe(self):
        print "Runner: ",self.id," Corral: ",self.corral," Pos: ",self.position
        
        
def getSpeed(runner):
    
    
    # TEMP = float(currentTemp)
    DISTANCE = float(runner.position)
    corral = runner.corral 
    speed = 0.0
    
    return speeds[corral]['intercept'] + speeds[corral]['slope']*DISTANCE + runner.deviation
    # #CORRAL A
    # if corral == 0:
    #     speed = 7.410739129 + (-0.02280316304)*DISTANCE
    # #CORRAL B
    # if corral == 1:
    #     speed = 6.720575488 + (-0.02714138849)*DISTANCE
    # #CORRAL C
    # if corral == 2:
    #     speed = 6.05103729 + (-0.02377687221)*DISTANCE
    # #CORRAL D
    # if corral == 3:
    #     speed = 5.53263038 + (-0.02222242746)*DISTANCE
    

    # return speed+runner.deviation




def GenerateRunners(number_runners):

    #generate runners
    Runners = {}
    # we need to extract data from file 
    corralData = open('percentages.txt','r')
    
    line_array = []
    percentage = {}
    stdDev = {}
    startTime = {}
    startInterval = {}
    corral = {}
    startDelay = {}
    i=0
    for line in corralData:
        lines = line.strip()
        lines = lines.split('\t')
        line_array.append(lines)
    data = line_array[1:]
    
    for each in data:
        corral[i] = each[0]
        percentage[i] = float(each[1])
        stdDev[i] = float(each[2])
        startTime[i] = float(each[3])
        startInterval[i] = float(each[4])
        i+=1
    
    corralCum = [0]*i
    corralCum[0]=1
    corralCum[1]=1
    print "Number:",number_runners
    for i in range(number_runners):
        randNum = random.random()
        #print randNum
        corralNum = 0
        pct = 0
        #print percentage[corralNum]
        while (float(percentage[corralNum]) < float(randNum) and corralNum<7):
            #decide which one to put by looping on increasing number of corrals
            corralNum+=1
            #print corralNum,
        corralCum[corralNum]+=1
        if corralNum>7:
            wave=2
        else:
            wave=1
        
        runnerStdDev = random.gauss(0,stdDev[corralNum])
        runner = Runner(i,corralNum,runnerStdDev)
        
        Runners[i]=(runner)
    
    
    # corral numbers
    print corralCum
        #now give them start times
    for j in range(len(startTime)):
        startDelay[j] = float(startInterval[j])/float(corralCum[j])
    
    #here, we would assign starting times to the fastest first and then the slow people
    
    #now assign to each of the runners a time
    corralNumDone = [0]*len(corralCum)
    for i in range(number_runners):
        runner = Runners[i]
        corral = runner.corral
        Runners[i].startTime = startTime[corral] + startDelay[corral]*corralNumDone[corral]
        #print Runners[i].startTime
        corralNumDone[corral]+=1

    return Runners
    
def main():

    con = mdb.connect(host='localhost',user='rsquared11',db='shamrock2017')
    cur = con.cursor()

    print "getting speed functions"
    file_speeds = open('speeds.txt','r')
    i=0
    for line in file_speeds:
        [corral,slope,intercept] = [float(x) for x in (line.strip().split('\t'))]
        speeds[int(corral)] = {}
        speeds[int(corral)]['slope'] = slope
        speeds[int(corral)]['intercept'] = intercept

    # with con:
    if (1==1):
        sql = "Delete from MarathonRunners;"
        print "Deleting current race table"
        cur.execute(sql);
        number_runners = int(input("How many 8k runners do we have?"))/ratio_grouped
        currentTemp = int(input("What's the predicted temperature? use integers"))
         
        print number_runners

        Runners = GenerateRunners(number_runners)
        
        print len(Runners)
        
        runnersSegment = {}
        startedMin = {}
        finishedMin = {}
        runnersDrops = {} #new for 2017
        
        # ====== 2017 Drops Pred - start ====== 
        # load in drop ratios
        dropPct_table = calcDrops.load_drops()
            
        # load starting numbers for each corral
        start_table = calcDrops.load_starts()
            
        # load in average time by corral and event
        times_table = calcDrops.load_times()
        
        # calculate number of drops from ratios and starting numbers
        dropCt_table = calcDrops.calc_drops(dropPct_table, start_table)
        
        # ====== 2017 Drops Pred - end ====== 
        
        #### now let them run the entire race
        operations = 0
        minute = -24
        onCourse=0
        totalDropped = 0
        while (minute<totalMinutes):
            # print "total dropped:",totalDropped
            drop=0
            Halfhour = int(minute/30)
            # print "hfhour:",Halfhour
            
            # commenting out to replace with new drop code
            #if droputDone[Halfhour]<dropoutPerHalfHour[Halfhour]:
            #    if (random.random()>0.5):
            #        drop = 1
            #        selectedDropout = int(float(random.random())*float(number_runners))
            
            #if drop==1:
            #    totalDropped+=1
            #    droputDone[Halfhour]+=1
            #    Runners[selectedDropout].dropout = 1
            #
           # ====== 2017 Drops Pred - start ====== 

            # calculate current drops based upon current minute and average corral pace
            totalDrops = calcDrops.sumDrops(times_table, dropCt_table, minute)

            # ====== 2017 Drops Pred - end ====== 
            
            minute +=minuteInterval
            

            started = 0
            for key in Runners:
                runner = Runners[key]
                if (runner.started==False):
                    if runner.startTime < minute:
                        Runners[key].started=True
                        Runners[key].position = 0.00
                        started+=ratio_grouped
            print "Time: ",minute/60,':',minute%60,'\t',"On course",onCourse,
            print "started:",started
            
            #testing drops
            print "Drops:",totalDrops
          
            onCourse = 0
            positions = []
            for key in Runners:
                runner = Runners[key]
                if (runner.started==True and runner.finished==False):
                    position = runner.position
                    speedKmPerMin = float(getSpeed(runner)) * 1.609 / 60.0
                    position = runner.position + speedKmPerMin*float(minuteInterval)
                    if position>8.0:
                        position = 8.1
                        Runners[key].finished = True
                   
                    Runners[key].position = position
                    runner.position = position
                    positions.append(position)
                    onCourse+=ratio_grouped

                #now put the sql code for that runner
                if runner.started==True:
                    start=1
                else:
                    start=0
                if runner.finished==True:
                    finish=1
                else:
                    finish=0
                sql = "INSERT into MarathonRunners (runnerId,minute,started,finished,corral,startTime,position,deviation,dropout) VALUES ("+str(runner.id)+','+str(minute)+','+str(start)+','+str(finish)+','+str(runner.corral)+','+str(runner.startTime)+','+str(runner.position)+','+str(runner.deviation)+','+str(runner.dropout)+");"
                # print sql
                cur.execute(sql)
                operations+=1
            con.commit()
            
            
            #now store the number of runners at each mile for the entire totalMinutes minutes
            mileData = [0]*27
            started = 0
            finished = 0
            
            for key in Runners:
                runner = Runners[key]
                if runner.finished==True:
                    mileData[-1] += ratio_grouped
                    finished +=1
                if runner.started==True:
                    started +=1
                    if runner.position>8.1 and runner.finished==False:
                        runner.finished = True
                        mileData[-1] += ratio_grouped
                    pos = float(runner.position)
                    # file.write(str(pos)+'\n')
                    for i in range(27):
                        if float(pos)>float(1.609*float(i)):
                            mileData[i]+=ratio_grouped
            
            inMile = [0]*27
            for i in range(26):
                inMile[i] = mileData[i] - mileData[i+1]
                
            print inMile
                    
            runnersSegment[minute] = inMile
            startedMin[minute] = started
            finishedMin[minute] = finished
            # adding new drop calculation
            runnersDrops[minute] = totalDrops

        print "operations: ",operations
    
    file = open('Densities.csv','w')

    file.write("raceMinute,started,atMile0,atMile1,atMile2,atMile3,atMile4,atMile5,atMile6,atMile7,atMile8,atMile9,atMile10,atMile11,atMile12,atMile13,atMile14,atMile15,atMile16,atMile17,atMile18,atMile19,atMile20,atMile21,atMile22,atMile23,atMile24,atMile25,atMile26,finished,drops\n")
    for minute in range(0,totalMinutes,minuteInterval):
        txt = str(minute)+","+str(startedMin[minute])
        for mile in range(27):
            txt += ","+str(runnersSegment[minute][mile])
        txt += ","+str(finishedMin[minute])
        txt += ","+str(runnersDrops[minute])+'\n'
        file.write(txt)

    print totalDropped
        

ratio_grouped = 10
minuteInterval = 2
currentTemp = 60
if __name__=='__main__':
    main();
    
#groups of 20, 1 minute interval: 1:36.74 (1,084,680 operations)