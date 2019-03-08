"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uWS = __importStar(require("uWebSockets.js"));
const WebSocketContext_1 = __importDefault(require("./WebSocketContext"));
const handleSignal_1 = __importDefault(require("./handleSignal"));
const PORT = 9001;
uWS
    .App({})
    .ws('/*', {
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 1e7,
    open: (ws, req) => {
        const key = req.getUrl().slice(1);
        if (!key) {
            ws.close();
            return;
        }
        ws.context = new WebSocketContext_1.default(['abc']);
    },
    message: (ws, message, isBinary) => {
        if (!isBinary) {
            const str = Buffer.from(message).toString();
            let payload;
            try {
                payload = JSON.parse(str);
            }
            catch (e) {
                console.log('Err payload', str);
                ws.publish('home/sensors/temperature', str);
                return;
            }
            if (payload.type !== 'candidate') {
                console.log('got payload', payload);
            }
            handleSignal_1.default(ws, payload);
        }
        else {
            console.log('got message', message);
        }
    },
    close: (_ws, code, message) => {
        console.log('closed', code, message);
    }
})
    .any('/*', (res, _req) => {
    res.end('End');
})
    .listen(PORT, (listenSocket) => {
    if (listenSocket) {
        console.log('listening to port', PORT);
    }
    else {
        console.log('listen failed');
    }
});
//# sourceMappingURL=server.js.map