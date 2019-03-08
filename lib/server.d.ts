import * as uWS from 'uWebSockets.js';
import WebSocketContext from "./WebSocketContext";
export interface uWebSocket extends uWS.WebSocket {
    context: WebSocketContext;
}
