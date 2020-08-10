const getNameServers = require('../lib/nameservers/get')

getNameServers.godaddy('localizehtml.com').then(data=>console.log(data))