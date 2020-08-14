# Torus Tools - Domains

A promise-based SDK that standarizes interaction with various different domain registrars.

## Currently Supporting
- aws
-godaddy

**If you are interested in adding new providers create the feature request and we will add it to our pipeline; or feel free to submit your own PR** :sunglasses:

## Records Format
the records parameter has the following format
```
{
  name:"example.com",  //traffic coming into (root domain or sub-domain)
  data: "192.0.2.44",  //route traffic to somewhere (an ip or resource ARN)
  type: "CNAME",  //type of record.
  ttl: 3600   //ttl for the record if required
  alias: true|false   //depending on this value the record will either have a resourceRecords attribute or an aliasTarget attribute in AWS
}
```
## Record Types
 - A
 - AAAA
 - CAA
 - CNAME
 - MX
 - NAPTR
 - NS
 - PTR
 - SOA
 - SPF
 - SRV
 - TXT