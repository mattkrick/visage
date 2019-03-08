"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleInit = (ws, payload) => {
    if (ws.context.id)
        return;
    ws.context.init(payload);
    ws.subscribe(`signal/user/${payload.from}`);
    console.log('sub to', `signal/user/${payload.from}`);
    const message = JSON.stringify({ type: 'pubInit', from: payload.from });
    ws.context.rooms.forEach((room) => {
        ws.publish(`signal/room/${room}`, message);
        ws.subscribe(`signal/room/${room}`);
        console.log('sub to room', room);
    });
};
exports.default = handleInit;
//# sourceMappingURL=handleInit.js.map