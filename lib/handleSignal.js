"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInit_1 = __importDefault(require("./handleInit"));
const handlePubInit_1 = __importDefault(require("./handlePubInit"));
const handlePubKickOut_1 = __importDefault(require("./handlePubKickOut"));
const handleOffer_1 = __importDefault(require("./handleOffer"));
const handlePublishToClient_1 = __importDefault(require("./handlePublishToClient"));
const handleAnswer_1 = __importDefault(require("./handleAnswer"));
const handleCandidate_1 = __importDefault(require("./handleCandidate"));
const handlers = {
    init: handleInit_1.default,
    pubInit: handlePubInit_1.default,
    pubKickOut: handlePubKickOut_1.default,
    offer: handleOffer_1.default,
    pubToClient: handlePublishToClient_1.default,
    answer: handleAnswer_1.default,
    candidate: handleCandidate_1.default
};
const handleSignal = (ws, payload) => {
    const { type } = payload;
    const handler = handlers[type];
    if (!handler)
        return false;
    handler(ws, payload);
    return true;
};
exports.default = handleSignal;
//# sourceMappingURL=handleSignal.js.map