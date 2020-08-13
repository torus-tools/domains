const updateNameservers = require('./lib/nameservers/update')
//const deleteRecord = require('./lib/records/delete')

for(let n in updateNameservers) module.exports[n].updateNameservers = updateNameservers[n]

//addRecord(recordName, recordType)
//updateRecord(recordName, recordType)

//deleteRecord
for(let d in deleteRecord) module.exports[d].deleteRecord = deleteRecord[a]

//updateRecords
//deleteRecords