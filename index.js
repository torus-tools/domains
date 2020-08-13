const getNameservers = require('./lib/nameservers/get')
const updateNameservers = require('./lib/nameservers/update')
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
  updateNameservers: updateNameservers.aws
}
module.exports.godaddy = {
  getNameservers: getNameservers.godaddy,
  updateNameservers: updateNameservers.godaddy
}
