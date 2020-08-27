const getNameservers = require('./lib/nameservers/get')
const updateNameservers = require('./lib/nameservers/update')
const addRecord = require('./lib/records/add')
const upsertRecords = require('./lib/records/upsert')
const createRedirect = require('./lib/records/createRedirect')
//const deleteRecord = require('./lib/records/delete')

/* for(let g in getNameservers){
  if(!module.exports[g]) module.exports[g] = {}
  module.exports[g].getNameservers = getNameservers[g]
}

for(let u in updateNameservers){
  if(!module.exports[u]) module.exports[u] = {}
  module.exports[u].updateNameservers = updateNameservers[u]
}
 */

module.exports.aws = {
  getNameservers: getNameservers.aws,
  updateNameservers: updateNameservers.aws,
  addRecords: addRecord.aws,
}
module.exports.godaddy = {
  getNameservers: getNameservers.godaddy,
  updateNameservers: updateNameservers.godaddy,
  addRecords: addRecord.godaddy,
  upsertRecords: upsertRecords.godaddy,
  createRedirect: createRedirect.godaddy
}
