var AWS = require('aws-sdk');
var route53 = new AWS.Route53({apiVersion: '2014-05-15'});
const axios = require('axios');

//delete a record with a given type for a given domain
//domain must be a string that is a valid domain name
//name must be a string with the name of the record
//type must be a string equal to one of the follwoing options:
// A | AAAA | CAA | CNAME | MX | NAPTR | NS | PTR | SOA | SPF | SRV | TXT

//AWS
function getHostedZoneByName(domain){
  return new Promise((resolve, reject) => {
    var params = {"DNSName": domain};
    route53.listHostedZonesByName(params).Promise()
    .then(data => {
      if(data.HostedZones[0]) {
        if(data.HostedZones[0].Name === domain + '.') resolve(data.HostedZones[0].Id)
        else reject('no hosted zones exist for the given domain')
      }
      else reject('no hosted zones')
    })
    .catch(err => reject(err))
  })
}

function aws(domain, name, type){
  return new Promise((resolve, reject) => {
    getHostedZoneByName(domain)
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

//GoDaddy
/* function godaddy(domain, name, type){
  var geturl = `https://api.godaddy.com/v1/domains/${domain}/records`
  var posturl = `https://api.godaddy.com/v1/domains/${domain}/records`
  const options = {
    headers: {
      'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  axios.get(geturl, params, options)
  .then(data => {
    let newRecords = []
    data.map(record => {
      if(record.name !== name && record.type !== type) newRecords.push(record)
    })
    var params = newRecords
    axios.post(posturl, params, options)
    .then(response => resolve(response))
    .catch(error => reject(error))
  })
} */
  
module.exports = {
  aws,
  godaddy
}
