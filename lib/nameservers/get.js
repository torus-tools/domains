//domain must be a string that is a valid domain name
//nameservers must be an array of strings that are valid nameservers

//AWS
function aws(domain){
  return new Promise((resolve, reject) => {
    let stackName = domain.split('.').join('') + 'Stack'
    var params = {
      LogicalResourceId: 'HostedZone',
      StackName: stackName
    };
    cloudformation.describeStackResource(params, (err, data) => {
      if (err) reject(err)
      else {
        var params = {Id: data.StackResourceDetail.PhysicalResourceId}
        route53.getHostedZone(params, (err, data) => {
          if (err) reject(err);
          else resolve(data.DelegationSet.NameServers);
        });
      }
    });
  });
}

//GoDaddy
function godaddy(domain, nameservers){
  var url = `https://api.godaddy.com/v1/domains/${domain}`
  const options = {
    headers: {
      'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  var params = {
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
  }
  axios.post(url, params, options)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = {
  aws,
  godaddy
}
