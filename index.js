const updateNameservers = require('./lib/nameservers/update')
const deleteRecord = require('./lib/records/delete')

//updateNameservers
for(let n in updateNameservers) module.exports[n].updateNameservers = updateNameservers[n]

//addRecord(recordName, recordType)
//updateRecord(recordName, recordType)

//deleteRecord
for(let d in deleteRecord) module.exports[a].deleteRecord = deleteRecord[a]

//updateRecords
//deleteRecords