import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
/**
 * Validates and sanitizes a URL
 * @param url The URL to validate
 * @returns The validated URL object
 * @throws McpError if the URL is invalid
 */
export function validateUrl(url) {
    try {
        const parsedUrl = new URL(url);
        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            throw new McpError(ErrorCode.InvalidParams, `Invalid URL protocol: ${parsedUrl.protocol}. Only HTTP and HTTPS are allowed.`);
        }
        // Prevent localhost and private IPs to avoid SSRF
        const hostname = parsedUrl.hostname.toLowerCase();
        if (hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '0.0.0.0' ||
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.') ||
            hostname.startsWith('172.') ||
            hostname.endsWith('.local')) {
            throw new McpError(ErrorCode.InvalidParams, 'URLs pointing to localhost or private networks are not allowed');
        }
        return parsedUrl;
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InvalidParams, `Invalid URL format: ${url}`);
    }
}
