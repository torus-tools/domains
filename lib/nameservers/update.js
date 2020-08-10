var AWS = require('aws-sdk');
var route53domains = new AWS.Route53Domains({apiVersion: '2014-05-15'});
const axios = require('axios');

//update nameservers for a given domain in a given registrar
//domain must be a string that is a valid domain name
//nameservers must be an array of strings that are valid nameservers

//AWS
function aws(domain, nameservers){
  let ns = []
  for(let n of nameservers) ns.push({Name: n})
  var params = {
    DomainName: domain,
    Nameservers: ns
  };
  route53domains.updateDomainNameservers(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

//GoDaddy
function godaddy(domain, nameservers){
  return new Promise((resolve, reject) => {
    var url = `https://api.godaddy.com/v1/domains/${domain}`
    const options = {
      headers: {
        'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };
    var params = {
      "nameServers": nameservers
    }
    /* var params = {
      "locked": true,
      "nameServers": nameservers,
      "renewAuto": true,
      "subaccountId": "string",
      "exposeWhois": true,
      "consent": {
        "agreedAt": "string",
        "agreedBy": "string",
        "agreementKeys": [
          "EXPOSE_WHOIS"
        ]
      }
    } */
    axios.patch(url, params, options)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}

module.exports = {
  aws,
  godaddy
}