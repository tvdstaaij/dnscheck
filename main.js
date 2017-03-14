const Promise = require ('bluebird');
const Dns = require ('dns');
const Config = require ('./config.json');

function resolveDomain (domain) 
{
	const promises = {
		ip: Promise.promisify (Dns.resolve) (domain),
		ns: Promise.promisify (Dns.resolveNs) (domain)
	};

	return Promise.props (promises);
}

function* main ()
{
	for (let i = 0; i < Config.domains.length; i++)
	{
		if (i)
			yield Promise.delay (Config.delay);

		const domain = Config.domains[i];
		try
		{
			const resolved = yield resolveDomain (domain);
			const ip = resolved.ip[0];
			const ns = resolved.ns;

			if (ip === Config.ip)
				console.log (`[X] ${domain}`);
			else
				console.log (`[ ] ${domain} (${ip}; NS: ${ns.join (', ')})`);
		}
		catch (error)
		{
			console.log (`[E] ${domain}: ${error}`);
		}
	}
}

Promise.coroutine(main)();
