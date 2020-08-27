var AWS = require('aws-sdk');
var route53 = new AWS.Route53({apiVersion: '2014-05-15'});
const axios = require('axios');

const listRecords = require('./list')
const deleteRecords = require('./delete')

//AWS
function aws(domain){
  return new Promise((resolve, reject) => {
    listRecords.aws(domain).then(data => {
      deleteRecords.aws(domain, data.ResourceRecordSets)
      .then(data => resolve('All Done'))
      .catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

//godaddy
function godaddy(domain){
  return new Promise((resolve, reject) => {
    const url = `https://api.godaddy.com/v1/domains/${domain}/records`
    const params = {
      method: 'put',
      url: url,
      headers: {
        'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      data:[]
    }
    axios(params)
    .then(data => resolve(data))
    .catch(err=> reject(err))
  })
}
  
module.exports = {
  aws,
  godaddy
}
