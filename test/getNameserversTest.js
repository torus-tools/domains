const getNameServers = require('../lib/nameservers/get')

getNameServers.godaddy('localizehtml.com').then(data=>console.log(data)).catch(err=>console.log(err))

getNameServers.aws('supereasyforms.com').then(data=>console.log(data)).catch(err=>console.log(err))