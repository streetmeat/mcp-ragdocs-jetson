import { BaseTool } from './base-tool.js';
import fs from 'fs/promises';
import path from 'path';
const QUEUE_FILE = path.join(process.cwd(), 'queue.txt');
export class ListQueueTool extends BaseTool {
    constructor() {
        super();
    }
    get definition() {
        return {
            name: 'list_queue',
            description: 'List all URLs currently in the documentation processing queue',
            inputSchema: {
                type: 'object',
                properties: {},
                required: [],
            },
        };
    }
    async execute(_args) {
        try {
            // Check if queue file exists
            try {
                await fs.access(QUEUE_FILE);
            }
            catch {
                return {
                    content: [
                        {
                            type: 'text',
                            text: 'Queue is empty (queue file does not exist)',
                        },
                    ],
                };
            }
            // Read queue file
            const content = await fs.readFile(QUEUE_FILE, 'utf-8');
            const urls = content.split('\n').filter(url => url.trim() !== '');
            if (urls.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: 'Queue is empty',
                        },
                    ],
                };
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: `Queue contains ${urls.length} URLs:\n${urls.join('\n')}`,
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Failed to read queue: ${error}`,
                    },
                ],
                isError: true,
            };
        }
    }
}
