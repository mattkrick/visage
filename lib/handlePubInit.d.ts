import { uWebSocket } from "./server";
export interface PubInitPayload {
    type: 'pubInit';
    createdAt: number;
    from: string;
}
declare const handlePubInit: (ws: uWebSocket, payload: PubInitPayload) => void;
export default handlePubInit;
