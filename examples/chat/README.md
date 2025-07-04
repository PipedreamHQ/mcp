## Chatbot UI

Pipedream's fork of the [Next.js AI Chatbot](https://chat.vercel.ai/)

This demo app showcases how you can integrate Pipedream's MCP (Model Context Protocol) server into your AI application, providing access to 10,000+ tools across 2,700+ APIs. The chat interface demonstrates real-time interaction with external services through natural language.

### Key Features

- **MCP Integration**: Connect to thousands of APIs through Pipedream's MCP server
- **Multi-model Support**: Works with both Anthropic Claude and OpenAI models
- **Optional Authentication**: Configurable auth system for development vs production
- **Real-time API Calls**: Execute actions across different platforms directly from chat
- **Responsive Design**: Works on desktop and mobile devices

### Development Mode

For local development, you can disable authentication and persistence:

```bash
# In your .env file
DISABLE_AUTH=true
DISABLE_PERSISTENCE=true
EXTERNAL_USER_ID=your-dev-user-id
```

This allows you to test the chat functionality without setting up authentication or database persistence.

> [!IMPORTANT]  
> Treat this project as a reference implementation for integrating MCP servers into AI applications.

## Model Providers

We allow Anthropic + OpenAI today. The Vercel AI SDK supports other providers.

## Running locally

`cp .env.example .env` and fill in the appropriate values.

Then run all required local services:

```bash
docker compose up -d
```

Run migrations:

```bash
POSTGRES_URL=postgresql://postgres@localhost:5432/postgres pnpm db:migrate
```

Then start the app:

```bash
pnpm install
pnpm dev
```

By default the client will point at https://mcp.pipedream.net.  Use the `MCP_SERVER` env var to point the mcp server you have running locally:

```bash
MCP_SERVER=http://localhost:3010 pnpm dev
```

Your local app should now be running on [http://localhost:3000](http://localhost:3000/).
