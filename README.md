# MCP (Model Context Protocol)

This repository contains examples of using Pipedream's dynamic MCP server.

## What makes Pipedream's MCP server unique

Unlike traditional MCP implementations that only provide a fixed set of tools, Pipedream's MCP server offers the ability to identify and load tools dynamically. This means that the tools can either be pre-defined, or discovered and configured on-demand.

This type of [tool discovery](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates) is defined in the MCP spec, but most MCP clients don't support yet provide support for it.

This repo contains examples of how you, as the developer of an MCP client, can use Pipedream's app-level **or dynamic** MCP server.

## High level

The idea is to manually reload the list of tools on each turn.

## Examples

This repo includes three examples showing different approaches to integrating with Pipedream's dynamic MCP server:

- The **[AI SDK Example](examples/ai-sdk/)** uses Vercel's AI SDK with automatic tool handling
- The **[OpenAI SDK Example](examples/openai-sdk/)** uses OpenAI SDK directly with manual tool conversion for full control
- The **[Chat App Example](examples/chat/)** is a full-featured web application demonstrating MCP integration in a real-world chat interface

### Installation

Install dependencies:

```bash
pnpm install
```

### Prerequisites

To set up your environment, you'll need:

1. A [Pipedream account](https://pipedream.com/auth/signup)
2. A [Pipedream project](https://pipedream.com/docs/projects/#creating-projects). Accounts connected via MCP will be stored here.
3. [Pipedream OAuth credentials](https://pipedream.com/docs/rest-api/auth/#oauth)
4. An [OpenAI API key](https://platform.openai.com/api-keys)

### Set up your environment

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Learn more about [environments in Pipedream Connect](https://pipedream.com/docs/connect/managed-auth/environments).

### Running Examples

You can run the examples using the following commands from the root directory:

#### Vercel AI SDK Example

```bash
pnpm ai-sdk -u <external-user-id> "<prompt>"
```

#### OpenAI SDK Example

```bash
pnpm openai-sdk -u <external-user-id> "<prompt>"
```

For example:

```bash
pnpm ai-sdk -u <uuid> "Send a funny joke to the #random channel in Slack"
pnpm openai-sdk -u <uuid> "Send a funny joke to the #random channel in Slack"
```

#### Chat App Example

The chat app is a full-featured Next.js web application that demonstrates MCP integration in a production-ready environment:

```bash
cd examples/chat
pnpm install
pnpm dev
```

The chat app includes:

- **Interactive Web Interface**: Full-featured chat UI with real-time messaging
- **Multi-model Support**: Works with both Anthropic Claude and OpenAI models
- **Optional Authentication**: Configurable auth system for development vs production
- **MCP Tool Integration**: Access to 10,000+ tools across 2,700+ APIs
- **Responsive Design**: Works on desktop and mobile devices

For development, you can disable authentication and persistence by setting:

```bash
# In examples/chat/.env
DISABLE_AUTH=true
DISABLE_PERSISTENCE=true
EXTERNAL_USER_ID=your-dev-user-id
```

See the [Chat App README](examples/chat/README.md) for detailed setup instructions.
