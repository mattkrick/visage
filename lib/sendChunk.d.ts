import { uWebSocket } from "./server";
import ConnectionChunk from "./ConnectionChunk";
declare const sendChunk: (ws: uWebSocket, connectionChunk: ConnectionChunk, requestor: string) => void;
export default sendChunk;
