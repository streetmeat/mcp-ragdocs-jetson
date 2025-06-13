export class BaseHandler {
    server;
    apiClient;
    constructor(server, apiClient) {
        this.server = server;
        this.apiClient = apiClient;
    }
}
