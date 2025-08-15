# 🚗 Tesla Stock Notifier

This Cloudflare Worker monitors Tesla's vehicle inventory and sends notifications via NTFY when new vehicles become available. It also includes a cleanup mechanism for stale VINs and exposes an API endpoint to view the current stock.

## ✨ Features

- **Real-time Inventory Monitoring 🔍**: Continuously checks Tesla's inventory for new vehicles.
- **NTFY Notifications 🔔**: Sends detailed notifications for new vehicles, including car details (year, odometer, discount, options) and a direct link to the order page.
- **VIN Tracking & Cleanup 🧹**: Uses Cloudflare KV to track seen VINs and automatically removes stale entries after 24 hours to prevent duplicate notifications and manage KV storage.
- **Web API Endpoint 🌐**: Provides a `/api/stock` endpoint to view the current inventory via a web browser.

## 🛠️ Setup and Configuration

### 1. Clone the Repository ⬇️

```bash
git clone https://github.com/your-username/tesla-stock-notifier.git
cd tesla-stock-notifier
```

### 2. Install Dependencies 📦

```bash
npm install
```

### 3. Cloudflare Wrangler Setup ☁️

Ensure you have `wrangler` installed and configured for your Cloudflare account.

```bash
npm i -g wrangler
wrangler login
```

### 4. Configure `wrangler.toml` ⚙️

The `wrangler.toml` file is pre-configured with the worker name and compatibility date. You need to ensure your KV namespace binding is correctly set up.

```toml
name = "tesla-stock-notifier"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[triggers]
crons = ["* * * * *"] # Runs every minute

[[kv_namespaces]]
binding = "TESLA_VIN_STORE"
id = "YOUR_KV_NAMESPACE_ID" # Replace with your actual KV Namespace ID
```

To create a KV namespace and get its ID, run:

```bash
wrangler kv:namespace create "TESLA_VIN_STORE"
```

### 5. Environment Variables 🔑

Create a `.dev.vars` file in the root directory of your project and add the following environment variables:

```
NTFY_URL="YOUR_NTFY_SERVER_URL"
TESLA_API_URL="YOUR_TESLA_INVENTORY_API_URL"
NTFY_BEARER_TOKEN="YOUR_NTFY_BEARER_TOKEN" # Optional, if your NTFY server requires authentication
```

**How to get `YOUR_TESLA_INVENTORY_API_URL`:**

1.  Go to the Tesla inventory page for your region (e.g., `https://www.tesla.com/nl_NL/inventory/new`).
2.  Open your browser's developer tools (usually F12).
3.  Go to the "Network" tab.
4.  Refresh the page.
5.  Look for a request that starts with `inventory/api/v4/inventory-results?query=`. This is the API URL you need. Copy the full URL, including all query parameters.

**How to get `YOUR_NTFY_SERVER_URL`:**

This is the URL of your self-hosted NTFY server (e.g., `https://ntfy.example.com/mytopic`).

### 6. Deployment 🚀

Once configured, deploy the worker to Cloudflare:

```bash
npx wrangler deploy
```

## 📊 API Endpoint

The worker exposes a simple API endpoint to view the current stock that the worker has processed:

`YOUR_WORKER_URL/api/stock`

Replace `YOUR_WORKER_URL` with the URL assigned to your Cloudflare Worker after deployment.

## 📁 Project Structure

```
.
├── src/
│   ├── index.ts          # Main worker entry point, Hono API, and scheduled task
│   ├── tesla.ts          # Tesla API interaction logic
│   ├── ntfy.ts           # NTFY notification sending logic
│   ├── store.ts          # Cloudflare KV store interaction logic
│   └── types/
│       └── tesla.ts      # TypeScript interfaces for Tesla API response
├── .dev.vars             # Local environment variables (ignored by git)
├── .dev.vars.example     # Example for .dev.vars
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── wrangler.toml         # Cloudflare Worker configuration
```
