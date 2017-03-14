var Promise = require ('bluebird');
var Dns = require ('dns');
var Config = require ('./config.json');

let status = {};

for (let i = 0; i < Config.domains.length; i++)
{
	let domain = Config.domains[i];
	
	Promise.delay (i * Config.delay)
		.then
		(
			() => {
				let promises = [
					Promise.promisify (Dns.resolve) (domain),
					Promise.promisify (Dns.resolveNs) (domain)
				];
				
				return Promise.all (promises);
			}
		)
		.then
		(
			(resolved) => {
				let ip = resolved[0][0];
				let ns = resolved[1];
				
				return { ok: ip == Config.ip, ip: ip, ns: ns };
			}
		)
		.catch
		(
			(error) => {
				return { error: error };
			}
		)
		.then
		(
			(domainStatus) => {
				if (domainStatus.error)
					console.log ('[E] ' + domain + ': ' + domainStatus.error);
				else if (domainStatus.ok)
					console.log ('[X] ' + domain);
				else
					console.log ('[ ] ' + domain + ' (' + domainStatus.ip + '; NS: ' + domainStatus.ns.join (', ') + ')');
			}
		);
}
