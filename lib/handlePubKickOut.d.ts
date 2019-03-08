import { uWebSocket } from "./server";
export interface PubKickOutPayload {
    type: 'pubKickOut';
    createdAt: number;
}
declare const handlePubKickOut: (ws: uWebSocket, payload: PubKickOutPayload) => void;
export default handlePubKickOut;
