import csv

def load_drops():
	reader = csv.reader(open('../data/runner_dropPcts.csv', 'r'))
	d = {}
	for row in reader:
		event, corral, drop = row
		d[event, corral] = drop
	return d

def load_starts():
	reader = csv.reader(open('../data/runner_starts.csv', 'r'))
	d = {}
	for row in reader:
		corral, start = row
		d[corral] = start
	return d

def load_times():
	reader = csv.reader(open('../data/runner_times.csv', 'r'))
	d = {}
	for row in reader:
		event, corral, times = row
		d[event, corral] = times
	return d

def calc_drops(data, start):
	drops = {}
	runners = {}
	corrals = ['A','B','C','D','E', 'F','G','H']
	events = ['1K','2K','3K','4K','5K','6K','7K','Finish']

	for corral in corrals:
		drops['Start',corral] = 0
		runners[corral] = start[corral]

		# calculate for other events (K marks)
		for event in events:
			tmp_drop = - round (float( runners[corral])  * float( data[event,corral])  ,0)
			runners[corral] = float( runners[corral])  - tmp_drop
			drops [event, corral] = tmp_drop

	return drops
	
def sumDrops(times, drops, curMinute):
	totalDrops =  sum( [float(drops[k]) for k, v in times.items() if float(v) <= curMinute])

	return totalDrops