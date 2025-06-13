export class BaseTool {
    formatResponse(data) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    }
    handleError(error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error}`,
                },
            ],
            isError: true,
        };
    }
}
