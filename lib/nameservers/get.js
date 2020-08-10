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
function godaddy(domain){
  return new Promise((resolve, reject) => {
    var url = `https://api.godaddy.com/v1/domains/${domain}`
    const options = {
      headers: {
        'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };
    var params = {}
    axios.get(url, params, options)
    .then(res => resolve(res.nameServers))
    .catch(err => reject(err))
  })
}

module.exports = {
  aws,
  godaddy
}
