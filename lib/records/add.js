const getHostedZoneByDomain = require('../getDnsId')

/* 
record is an object with the follwoing properties
{
  name:"example.com", //traffic coming into (root domain or sub-domain)
  value: "192.0.2.44", //route traffic to somewhere (an ip or resource ARN)
  type: "CNAME", //type of record. available records include:
  alias: true|false //depending on this value the record will either have a resourceRecords attribute or an aliasTarget attribute 
}
*/


/* ChangeBatch: {
  Changes: [
     {
    Action: "CREATE", 
    ResourceRecordSet: {
     AliasTarget: {
      DNSName: "d123rk29d0stfj.cloudfront.net", 
      EvaluateTargetHealth: false, 
      HostedZoneId: "Z2FDTNDATAQYW2"
     }, 
     Name: "example.com", 
     Type: "A"
    }
   }
  ], 
  Comment: "CloudFront distribution for example.com"
}, */

function aws(domain, record){
  return new Promise((resolve, reject) => {
    getHostedZoneByDomain.aws(domain).then(hostedZoneId => {
      var params = {
        ChangeBatch: {
        Changes: [
          {
            Action: "CREATE", 
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