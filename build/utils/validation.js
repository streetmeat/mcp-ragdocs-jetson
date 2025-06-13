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
/**
 * Sanitizes user input to prevent injection attacks
 * @param input The input to sanitize
 * @param maxLength Maximum allowed length
 * @returns The sanitized input
 */
export function sanitizeInput(input, maxLength = 1000) {
    if (!input || typeof input !== 'string') {
        return '';
    }
    // Trim and limit length
    let sanitized = input.trim().slice(0, maxLength);
    // Remove null bytes
    sanitized = sanitized.replace(/\0/g, '');
    // Remove control characters except newlines and tabs
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    return sanitized;
}
/**
 * Validates a search query
 * @param query The query to validate
 * @returns The sanitized query
 * @throws McpError if the query is invalid
 */
export function validateSearchQuery(query) {
    if (!query || typeof query !== 'string') {
        throw new McpError(ErrorCode.InvalidParams, 'Search query is required and must be a string');
    }
    const sanitized = sanitizeInput(query, 500);
    if (sanitized.length === 0) {
        throw new McpError(ErrorCode.InvalidParams, 'Search query cannot be empty');
    }
    return sanitized;
}
