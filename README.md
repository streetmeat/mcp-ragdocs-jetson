# RAG Documentation MCP Server

An MCP server implementation that provides tools for retrieving and processing documentation through vector search, enabling AI assistants to augment their responses with relevant documentation context.

## Features

- Vector-based documentation search and retrieval
- Support for multiple documentation sources
- Semantic search capabilities
- Automated documentation processing
- Real-time context augmentation for LLMs

## Tools

### add_documentation
Add documentation from a URL to the RAG database.

**Inputs:**
- `url` (string): URL of the documentation to fetch

### search_documentation
Search through stored documentation.

**Inputs:**
- `query` (string): Search query
- `limit` (number, optional): Maximum number of results to return (default: 5)

### list_sources
List all documentation sources currently stored.

### extract_urls
Extract all URLs from a given web page.

**Inputs:**
- `url` (string): URL of the page to extract URLs from
- `add_to_queue` (boolean, optional): If true, automatically add extracted URLs to the queue

### queue_documentation
Add URLs to the documentation processing queue.

**Inputs:**
- `urls` (string[]): Array of URLs to add to the queue

### list_queue
List all URLs currently in the documentation processing queue.

### run_queue
Process URLs from the queue one at a time until complete.

### remove_documentation
Remove documentation sources by URLs.

**Inputs:**
- `urls` (string[]): Array of URLs to remove from the database

## Usage

The RAG Documentation tool is designed for:

- Enhancing AI responses with relevant documentation
- Building documentation-aware AI assistants
- Creating context-aware tooling for developers
- Implementing semantic documentation search
- Augmenting existing knowledge bases

## Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rag-docs": {
      "command": "npx",
      "args": [
        "-y",
        "@hannesrudolph/mcp-ragdocs"
      ],
      "env": {
        "OPENAI_API_KEY": "",
        "QDRANT_URL": "",
        "QDRANT_API_KEY": ""
      }
    }
  }
}
```

You'll need to provide values for the following environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key for embeddings generation
- `QDRANT_URL`: URL of your Qdrant vector database instance
- `QDRANT_API_KEY`: API key for authenticating with Qdrant

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

## Acknowledgments

This project is a fork of [qpd-v/mcp-ragdocs](https://github.com/qpd-v/mcp-ragdocs), originally developed by qpd-v. The original project provided the foundation for this implementation.