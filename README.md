# DNS Query Worker

This repository contains a Cloudflare Worker script that performs DNS queries to multiple public DNS resolvers (Cloudflare, Google, Quad9, and AdGuard). The script periodically queries specific DNS records to verify resolver functionality and logs the results.

## Features

- **Periodic DNS Queries:** Runs scheduled DNS queries to multiple resolvers using Cloudflare's cron trigger.
- **Supported Resolvers:** Includes support for Cloudflare (1.1.1.1), Google (dns.google), Quad9 (dns.quad9.net), and AdGuard (dns.adguard.com).
- **Multi-server Queries:** Automatically queries DNS records for multiple servers (e.g., `server1.example.com`, `server2.example.com`).
- **Error Handling:** Logs errors and failed responses for debugging.

## Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:vincent-cf/dns-loop.git
   cd dns-loop
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

4. Configure your `wrangler.toml` file with the appropriate settings:
   ```toml
   name = "dns-loop"
   main = "src/index.ts"
   compatibility_date = "2025-01-16"

   [[triggers.crons]]
   schedule = "*/1 * * * *"  # Run every minute

   account_id = "your-cloudflare-account-id"
   ```

## Usage

### Deploy the Worker
Deploy the script to your Cloudflare account:
```bash
wrangler deploy
```

### Test Locally
Run the worker locally for testing:
```bash
wrangler dev
```

## Configuration

### Adding or Removing Resolvers
You can modify the `resolvers` array in the worker script to add or remove DNS resolvers:

```typescript
const resolvers = [
  { name: "Cloudflare", url: "https://1.1.1.1/dns-query" },
  { name: "Google", url: "https://dns.google/resolve" },
  { name: "Quad9", url: "https://dns.quad9.net:5053/dns-query" },
  { name: "AdGuard", url: "https://dns.adguard.com/resolve" },
];
```

### Changing Server List
The `servers` array in the script specifies which DNS records to query. Update it as needed:

```typescript
const servers = Array.from({ length: 10 }, (_, i) => `server${i + 1}.your-domain.com`);
```

## Example Logs
Successful queries will log the DNS response, while errors will log detailed messages for debugging:

```plaintext
DNS response from Cloudflare for server1.example.com: { ... }
Error querying server2.example.com on Google: 400 Bad Request
```

## Contributing
Feel free to open issues or submit pull requests to improve the script or documentation.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

