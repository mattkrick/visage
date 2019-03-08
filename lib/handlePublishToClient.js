"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePublishToClient = (ws, payload) => {
    ws.send(JSON.stringify(payload), false, false);
};
exports.default = handlePublishToClient;
//# sourceMappingURL=handlePublishToClient.js.map