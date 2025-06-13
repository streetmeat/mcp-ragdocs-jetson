export function isDocumentPayload(payload) {
    if (!payload || typeof payload !== 'object')
        return false;
    const p = payload;
    return (p._type === 'DocumentChunk' &&
        typeof p.text === 'string' &&
        typeof p.url === 'string' &&
        typeof p.title === 'string' &&
        typeof p.timestamp === 'string');
}
