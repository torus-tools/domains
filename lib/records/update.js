const getHostedZoneByDomain = require('../getDnsId')

//in the case of aws upsert will also create a record if it doesnt exist, if it does exist it will update it.

function aws(domain, record){
  return new Promise((resolve, reject) => {
    getHostedZoneByDomain.aws(domain).then(hostedZoneId => {
      var params = {
        ChangeBatch: {
          Changes: [
            {
              Action: "UPSERT", 
              ResourceRecordSet: {
                Name: "example.com", 
                ResourceRecords: [
                  {
                    Value: "192.0.2.44"
                  }
                ], 
                TTL: 60, 
                Type: "A"
              }
            }
          ], 
        }, 
        HostedZoneId: hostedZoneId
      };
      route53.changeResourceRecordSets(params).Promise()
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  })
}

module.exports = {
  aws
}