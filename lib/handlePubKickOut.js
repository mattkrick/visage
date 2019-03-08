"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePubKickOut = (ws, payload) => {
    if (ws.context.createdAt === payload.createdAt) {
        ws.end(1006, 'Duplicate id');
    }
};
exports.default = handlePubKickOut;
//# sourceMappingURL=handlePubKickOut.js.map