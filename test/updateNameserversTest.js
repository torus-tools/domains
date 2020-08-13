const updateNameServers = require('../lib/nameservers/update')

const ns = [
  'ns-945.awsdns-54.net',
  'ns-390.awsdns-48.com',
  'ns-1827.awsdns-36.co.uk',
  'ns-1045.awsdns-02.org'
]
updateNameServers.godaddy('localizehtml.com', ns).then(data=>console.log(data)).catch(err=>console.log(err))
//updateNameServers.aws('torusframework.com', ns).then(data=>console.log(data)).catch(err=>console.log(err))