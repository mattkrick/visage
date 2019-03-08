"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAnswer = (ws, payload) => {
    const { sdp, to } = payload;
    ws.publish(`signal/user/${to}`, JSON.stringify({ type: 'pubToClient', payload: { type: 'answer', from: ws.context.id, sdp } }));
};
exports.default = handleAnswer;
//# sourceMappingURL=handleAnswer.js.map