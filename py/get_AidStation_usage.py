
import MySQLdb as mdb
import math


con = mdb.connect(host='localhost',user='rsquared11',db='c9')
cur = con.cursor(mdb.cursors.DictCursor)

AidStations = {}
AidStations[1] = 2.6
AidStations[2] = 5.2
AidStations[3] = 8.1
AidStations[4] = 9.3
AidStations[5] = 12
AidStations[6] = 15
AidStations[7] = 17
AidStations[8] = 19
AidStations[9] = 20
AidStations[10] = 22.4
AidStations[11] = 24.6
AidStations[12] = 26.3
AidStations[13] = 28.5
AidStations[14] = 30.9
AidStations[15] = 32.4
AidStations[16] = 33.6
AidStations[17] = 35.9
AidStations[18] = 37.8
AidStations[19] = 38.8
AidStations[20] = 40.6

file = open('aidStationPeople.tsv','w')

file.write('Minute')
for i in range(20):
    file.write('\tAS'+str(i+1))
file.write('\n')

for i in range(0,490,10):
    usage_these_2minutes = []
    file.write(str(i))
    for key in AidStations:
        sqlTxt = """select 
            ( select count(*) from (select * from MarathonRunners where position<"""+str(AidStations[key])+" and minute="+str(i)+""") t0) -
            ( select count(*) from (select * from MarathonRunners where position<"""+str(AidStations[key])+" and minute="+str(i+10)+""") t1) 
            t2; """
        cur.execute(sqlTxt);
        rows = cur.fetchall()
        for row in rows:
            print i,":",key," - ",row['t2']*40
            file.write('\t'+str(row['t2']*40))
            if row['t2']>0:
                usage_these_2minutes.append([key,row['t2']])
    
    #now we sort them by number
    sortedList = sorted(usage_these_2minutes, key=lambda x:x[1],reverse=True)
    print sortedList
    for s in sortedList:
        file.write('\t'+str(s[0]))
    
    
    
    file.write('\n')
            

            