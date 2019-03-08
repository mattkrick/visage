"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CandidateSignal_1 = __importDefault(require("./CandidateSignal"));
const handleCandidate = (ws, payload) => {
    const { candidate } = payload;
    if (!candidate)
        return;
    const to = 'to' in payload ? payload.to : ws.context.acceptedOffers[payload.connectionId];
    if (to) {
        ws.publish(`signal/user/${to}`, JSON.stringify({ type: 'pubToClient', payload: { type: 'candidate', from: ws.context.id, candidate } }));
        return;
    }
    const { connectionId } = payload;
    const existingChunk = ws.context.pushQueue.find((connectionSignal) => connectionSignal.connectionId === connectionId);
    if (existingChunk) {
        existingChunk.signals.push(new CandidateSignal_1.default(candidate));
    }
};
exports.default = handleCandidate;
//# sourceMappingURL=handleCandidate.js.map