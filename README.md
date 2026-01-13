# Crone-Job(Scheduling Tasks)

## By Using node-cron (A npm package)

### cron Expression

#### To understand the cron-expression visit:-
Link: -  [crontab.guru](https://crontab.guru/)


## In schedular02.js file :- 

### we have some data in `invoice.json` in which some payments are done(i.e. paid) and some are pending. The payments those are done, we put them into the `archive.json` SO in short -> JOB to check the status of invoices and if status is paid we archive the record


## In schedular03.js file :-  (` HouseKeeping of records older than 180 days`)

### Let's suppose if we have 180 days old data in out db and we want to delete that 180 old data then we can set a query and can delete that data okk but we'll repeat this process manually again and again. so Use the concept of `Scheduling for HouseKeeping`

