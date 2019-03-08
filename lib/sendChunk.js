"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendChunk = (ws, connectionChunk, requestor) => {
    const { connectionId, signals } = connectionChunk;
    ws.send(JSON.stringify({ type: 'offerAccepted', connectionId, from: requestor }), false, false);
    ws.publish(`signal/user/${requestor}`, JSON.stringify({
        type: 'pubToClient',
        payload: { type: 'accept', signals, from: ws.context.id }
    }));
    ws.context.acceptedOffers[connectionId] = requestor;
};
exports.default = sendChunk;
//# sourceMappingURL=sendChunk.js.map