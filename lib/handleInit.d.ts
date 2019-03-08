import { uWebSocket } from "./server";
export interface InitPayload {
    type: 'init';
    sdp: string;
    connectionId: string;
    from: string;
}
declare const handleInit: (ws: uWebSocket, payload: InitPayload) => void;
export default handleInit;
