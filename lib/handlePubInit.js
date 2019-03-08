"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendChunk_1 = __importDefault(require("./sendChunk"));
const handlePubInit = (ws, payload) => {
    if (payload.from === ws.context.id) {
        if (ws.context.createdAt < payload.createdAt) {
            ws.publish(`signal/${payload.from}`, JSON.stringify({ type: 'pubKickOut', createdAt: payload.createdAt }));
        }
        return;
    }
    const connectionChunk = ws.context.pushQueue.pop();
    if (!connectionChunk) {
        ws.context.pullQueue.push(payload.from);
    }
    else {
        sendChunk_1.default(ws, connectionChunk, payload.from);
        ws.send(JSON.stringify({ type: 'offerRequest' }), false, false);
    }
};
exports.default = handlePubInit;
//# sourceMappingURL=handlePubInit.js.map