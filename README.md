# dnscheck

Node.js utility to check if a set of domains resolve to the desired IP address.

## Usage

After cloning the repository, run `npm install` from the project folder to install its dependencies.

Then, open `config.json` and add the domains to check into the `domains` array. Set the `ip` variable to the IP address you expect the domains to resolve to. The `delay` is set too `100` by default, meaning that between every domain check there will be a 100ms delay as to not get blocked by the DNS server for sending too many requests at the same time. If you experience a lot of errors, you may want to try increasing this.

After that's been done, simply run `node main.js` to start.

## Output

```
[X] robinj.be
[X] robinjacobs.eu
[E] thisdomaindoesnotexist.com: Error: queryA ENOTFOUND thisdomaindoesnotexist.com
[ ] github.com (192.30.253.113; NS: ns-421.awsdns-52.com, ns-1707.awsdns-21.co.uk, ns-1283.awsdns-32.org, ns-520.awsdns-01.net)
```

As this example output demonstrates, `[X] <domain>` means the domain resolves to the desired IP address. In case of an error, it will print `[E] <domain>` followed by more information about the error (in this case the domain does not exist). If the domain was resolved successfully but does not resolve to the desired IP address, the script will print `[ ] <domain>` followed by the IP address which the domain resolves to as well as the domain's NS records.

