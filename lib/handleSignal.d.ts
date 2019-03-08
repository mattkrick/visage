import { uWebSocket } from "./server";
declare const handleSignal: (ws: uWebSocket, payload: {
    [key: string]: any;
    type: string;
}) => boolean;
export default handleSignal;
