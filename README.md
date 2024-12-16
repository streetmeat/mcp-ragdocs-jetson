# RAG Documentation MCP Server

An MCP server implementation that provides tools for retrieving and processing documentation through vector search, enabling AI assistants to augment their responses with relevant documentation context.

## Features

- Vector-based documentation search and retrieval
- Support for multiple documentation sources
- Semantic search capabilities
- Automated documentation processing
- Real-time context augmentation for LLMs

## Tool

### rag_docs

Enables semantic search and retrieval of documentation to enhance AI responses.

**Inputs:**

- `query` (string): The search query for finding relevant documentation
- `maxResults` (integer): Maximum number of results to return
- `threshold` (float): Similarity threshold for results
- `context` (string, optional): Additional context to refine the search
- `format` (string, optional): Desired format of the results

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
      ]
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

## Acknowledgments

This project is a fork of [qpd-v/mcp-ragdocs](https://github.com/qpd-v/mcp-ragdocs), originally developed by qpd-v. The original project provided the foundation for this implementation.