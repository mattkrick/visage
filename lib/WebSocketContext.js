"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionChunk_1 = __importDefault(require("./ConnectionChunk"));
class WebSocketContext {
    constructor(rooms) {
        this.acceptedOffers = {};
        this.pushQueue = [];
        this.pullQueue = [];
        this.rooms = rooms;
        this.createdAt = Date.now();
    }
    init(payload) {
        const { from: id, connectionId, sdp } = payload;
        this.id = id;
        this.pushOffer(connectionId, sdp);
    }
    pushOffer(connectionId, sdp) {
        this.pushQueue.push(new ConnectionChunk_1.default(connectionId, sdp));
    }
}
exports.default = WebSocketContext;
//# sourceMappingURL=WebSocketContext.js.map