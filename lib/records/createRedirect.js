require('dotenv').config()
const axios = require('axios');

function godaddy(domain, reroute){
  return new Promise((resolve, reject) => {
    axios.get(`https://api.godaddy.com/v1/shoppers/${process.env.GODADDY_CUSTOMER_ID}?includes=customerId`, {
      headers: {
        'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      //console.log(res)
      const params = {
        method: 'put',
        url: `https://api.godaddy.com/v2/customers/${res.data.customerId}/domains/forwards/${domain}`,
        headers: {
          'Authorization': `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        data: {
          type: "REDIRECT_PERMANENT",
          url: reroute
        }
      }
      axios(params)
      .then(data => resolve(data))
      .catch(err=> reject(err))
    }).catch(err=> console.log(err))
  })
}

module.exports = {
  godaddy
}