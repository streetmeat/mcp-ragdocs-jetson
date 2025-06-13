import { ClearQueueTool } from '../tools/clear-queue.js';
export class ClearQueueHandler extends ClearQueueTool {
    constructor(server, apiClient) {
        super();
    }
    async handle(args) {
        return this.execute(args);
    }
}
