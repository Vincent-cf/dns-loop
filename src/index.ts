export default {
	async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext): Promise<void> {
	  // Define the list of server names
	  const servers = Array.from({ length: 10 }, (_, i) => `server${i + 1}.ddos-dns.online`);
  
	  // Define the resolvers with their URLs
	  const resolvers = [
		{ name: "Cloudflare", url: "https://1.1.1.1/dns-query" },
		{ name: "Google", url: "https://dns.google/resolve" },
		{ name: "Quad9", url: "https://dns.quad9.net:5053/dns-query" },
		{ name: "AdGuard", url: "https://dns.adguard.com/resolve" },  // Added AdGuard resolver
	  ];
  
	  // Iterate over each server
	  for (const server of servers) {
		// Iterate over each resolver
		for (const resolver of resolvers) {
		  // Adjust the URL based on the resolver type (no additional modifications needed for AdGuard here)
		  const url = `${resolver.url}?name=${server}`;
  
		  try {
			// Make the fetch request to the resolver
			const response = await fetch(url, {
			  headers: { accept: "application/dns-json" },
			  method: "GET",
			});
  
			// Check if the response was successful
			if (response.ok) {
			  const data = await response.json();
			  console.log(`DNS response from ${resolver.name} for ${server}:`, data);
			} else {
			  console.error(
				`Error querying ${server} on ${resolver.name}:`,
				response.status,
				response.statusText
			  );
			}
		  } catch (err) {
			// Handle errors gracefully
			console.error(`Failed to query ${server} on ${resolver.name}:`, err);
		  }
		}
	  }
	},
  };
  