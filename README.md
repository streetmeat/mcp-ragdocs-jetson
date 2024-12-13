# mcp-server-ragdocs

A Model Context Protocol (MCP) server that enables semantic search and retrieval of documentation using a vector database (Qdrant). This server allows you to add documentation from URLs or local files and then search through them using natural language queries.

## Version

Current version: 0.1.4

## Features

- Add documentation from URLs or local files
- Store documentation in a vector database for semantic search
- Search through documentation using natural language
- List all documentation sources

## Installation

You can use this server directly with `npx`:

```bash
npx -y @qpd-v/mcp-server-ragdocs
```

Or install it globally:

```bash
npm install -g @qpd-v/mcp-server-ragdocs
```

## Requirements

- Node.js 16 or higher
- Qdrant (either local or cloud)
- Ollama running locally for embeddings

## Qdrant Setup Options

### Option 1: Local Qdrant

1. Using Docker (recommended):
```bash
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

2. Or download from [Qdrant's website](https://qdrant.tech/documentation/quick-start/)

### Option 2: Qdrant Cloud

1. Create an account at [Qdrant Cloud](https://cloud.qdrant.io/)
2. Create a new cluster
3. Get your cluster URL and API key from the dashboard
4. Use these in your configuration (see Configuration section below)

## Configuration

### Claude Desktop

Add this to your Claude Desktop configuration file:

Windows: `%AppData%\Claude\claude_desktop_config.json`
macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

For Local Qdrant:
```json
{
  "mcpServers": {
    "ragdocs": {
      "command": "npx",
      "args": ["-y", "@qpd-v/mcp-server-ragdocs"],
      "env": {
        "OLLAMA_URL": "http://localhost:11434",
        "QDRANT_URL": "http://localhost:6333"
      }
    }
  }
}
```

For Qdrant Cloud:
```json
{
  "mcpServers": {
    "ragdocs": {
      "command": "npx",
      "args": ["-y", "@qpd-v/mcp-server-ragdocs"],
      "env": {
        "OLLAMA_URL": "http://localhost:11434",
        "QDRANT_URL": "https://your-cluster-url.qdrant.tech",
        "QDRANT_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Environment Variables

- `OLLAMA_URL` (optional): URL of your Ollama instance (defaults to http://localhost:11434)
- `QDRANT_URL` (required): URL of your Qdrant instance
  - For local: http://localhost:6333
  - For cloud: https://your-cluster-url.qdrant.tech
- `QDRANT_API_KEY` (required for cloud): Your Qdrant Cloud API key

## Available Tools

1. `add_documentation`
   - Add documentation from a URL to the RAG database
   - Parameters:
     - `url`: URL of the documentation to fetch

2. `search_documentation`
   - Search through stored documentation
   - Parameters:
     - `query`: Search query
     - `limit` (optional): Maximum number of results to return (default: 5)

3. `list_sources`
   - List all documentation sources currently stored
   - No parameters required

## Example Usage

In Claude Desktop or any other MCP-compatible client:

1. Add documentation:
```
Add this documentation: https://docs.example.com/api
```

2. Search documentation:
```
Search the documentation for information about authentication
```

3. List sources:
```
What documentation sources are available?
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/qpd-v/mcp-server-ragdocs.git
cd mcp-server-ragdocs
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run locally:
```bash
npm start
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
