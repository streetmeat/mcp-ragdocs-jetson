#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ApiClient } from './api-client.js';
import { HandlerRegistry } from './handler-registry.js';
class RagDocsServer {
    server;
    apiClient;
    handlerRegistry;
    constructor() {
        console.error('[MCP] Initializing server...');
        this.server = new Server({
            name: 'mcp-ragdocs',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        console.error('[MCP] Creating API client...');
        try {
            this.apiClient = new ApiClient();
            console.error('[MCP] API client created successfully');
        }
        catch (error) {
            console.error('[MCP] Failed to create API client:', error);
            throw error;
        }
        console.error('[MCP] Registering handlers...');
        this.handlerRegistry = new HandlerRegistry(this.server, this.apiClient);
        // Error handling
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.cleanup();
            process.exit(0);
        });
        process.on('uncaughtException', (error) => {
            console.error('[MCP] Uncaught exception:', error);
            process.exit(1);
        });
    }
    async cleanup() {
        await this.apiClient.cleanup();
        await this.server.close();
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('RAG Docs MCP server running on stdio');
    }
}
const server = new RagDocsServer();
server.run().catch(console.error);
