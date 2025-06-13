import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { BaseHandler } from './base-handler.js';
import { McpToolResponse } from '../types.js';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateUrl } from '../utils/validation.js';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUEUE_FILE = path.join(__dirname, '..', '..', 'queue.txt');

export class ExtractUrlsHandler extends BaseHandler {
  async handle(args: any): Promise<McpToolResponse> {
    if (!args.url || typeof args.url !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'URL is required');
    }

    // Validate URL before processing
    const validatedUrl = validateUrl(args.url);

    await this.apiClient.initBrowser();
    const page = await this.apiClient.browser.newPage();

    try {
      const baseUrl = validatedUrl;
      const basePath = baseUrl.pathname.split('/').slice(0, 3).join('/'); // Get the base path (e.g., /3/ for Python docs)

      await page.goto(validatedUrl.href, { waitUntil: 'networkidle' });
      const content = await page.content();
      const $ = cheerio.load(content);
      const urls = new Set<string>();

      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          try {
            const url = new URL(href, validatedUrl.href);
            // Only include URLs from the same documentation section
            if (url.hostname === baseUrl.hostname && 
                url.pathname.startsWith(basePath) && 
                !url.hash && 
                !url.href.endsWith('#')) {
              urls.add(url.href);
            }
          } catch (e) {
            // Ignore invalid URLs
          }
        }
      });

      const urlArray = Array.from(urls);

      if (args.add_to_queue) {
        try {
          // Ensure queue file exists
          try {
            await fs.access(QUEUE_FILE);
          } catch {
            await fs.writeFile(QUEUE_FILE, '');
          }

          // Append URLs to queue
          const urlsToAdd = urlArray.join('\n') + (urlArray.length > 0 ? '\n' : '');
          await fs.appendFile(QUEUE_FILE, urlsToAdd);

          return {
            content: [
              {
                type: 'text',
                text: `Successfully added ${urlArray.length} URLs to the queue`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Failed to add URLs to queue: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: urlArray.join('\n') || 'No URLs found on this page.',
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Failed to extract URLs: ${error}`,
          },
        ],
        isError: true,
      };
    } finally {
      await page.close();
    }
  }
}