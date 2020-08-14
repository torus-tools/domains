const listRecords = require('../lib/records/list')

/* listRecords.godaddy('localizehtml.com')
.then(res => console.log(res))
.catch(err=> console.log(err))
 */
listRecords.aws('supereasyforms.com')
.then(res => console.log(res))
.catch(err=> console.log(err))