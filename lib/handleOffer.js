"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OfferSignal_1 = __importDefault(require("./OfferSignal"));
const sendChunk_1 = __importDefault(require("./sendChunk"));
const handleOffer = (ws, payload) => {
    const { sdp } = payload;
    const to = 'to' in payload ? payload.to : ws.context.acceptedOffers[payload.connectionId];
    if (to) {
        ws.publish(`signal/user/${to}`, JSON.stringify({ type: 'pubToClient', payload: { type: 'offer', from: ws.context.id, sdp } }));
        return;
    }
    const { connectionId } = payload;
    const existingChunk = ws.context.pushQueue.find((connectionSignal) => connectionSignal.connectionId === connectionId);
    if (existingChunk) {
        existingChunk.signals.push(new OfferSignal_1.default(sdp));
        return;
    }
    ws.context.pushOffer(connectionId, sdp);
    const requestor = ws.context.pullQueue.pop();
    if (requestor) {
        const connectionChunk = ws.context.pushQueue.pop();
        sendChunk_1.default(ws, connectionChunk, requestor);
    }
};
exports.default = handleOffer;
//# sourceMappingURL=handleOffer.js.map