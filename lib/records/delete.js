var AWS = require('aws-sdk');
var route53 = new AWS.Route53({apiVersion: '2014-05-15'});
const axios = require('axios');
const getDnsId = require('../getDnsId')

//delete a record with a given type for a given domain
//domain must be a string that is a valid domain name
//name must be a string with the name of the record
//type must be a string equal to one of the follwoing options:
// A | AAAA | CAA | CNAME | MX | NAPTR | NS | PTR | SOA | SPF | SRV | TXT

//AWS
function aws(domain, name, type){
  return new Promise((resolve, reject) => {
    getDnsId.aws(domain)
    .then(data => {
      var params = {
        ChangeBatch: {
          Changes: [
            {
              Action: "DELETE", 
              ResourceRecordSet: {
                Name: name, 
                Type: type
              }
            }
          ], 
        }, 
        HostedZoneId: data
      }
      route53.changeResourceRecordSets(params).Promise()
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  })
}

function godaddy(domain, records){
  return new Promise((resolve, reject) => {
    listRecords.aws(domain).then(godaddyRecords => {
      let recordSet = []
      for(let rec of godaddyRecords){
        for(let r in records) {
          if(rec.name === records[r].name && rec.type === records[r].type) break
          else if(r >= records.length-1) recordSet.push(rec)
        }
      }
      const url = `https://api.godaddy.com/v1/domains/${domain}/records`
      console.log(recordSet)
      const params = {
        method: 'put',
        url: url,
        headers: {
          'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        data:recordSet
      }
      axios(params)
      .then(data => resolve(data))
      .catch(err=> reject(err))
    })
  })
}
  
module.exports = {
  aws,
  godaddy
}
