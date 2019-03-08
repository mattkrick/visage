"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OfferSignal_1 = __importDefault(require("./OfferSignal"));
class ConnectionChunk {
    constructor(connectionId, sdp) {
        this.connectionId = connectionId;
        this.signals = [new OfferSignal_1.default(sdp)];
    }
}
exports.default = ConnectionChunk;
//# sourceMappingURL=ConnectionChunk.js.map