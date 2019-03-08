import { uWebSocket } from "./server";
interface PublishToClientPayload {
    type: 'pubToClient';
    payload: any;
}
declare const handlePublishToClient: (ws: uWebSocket, payload: PublishToClientPayload) => void;
export default handlePublishToClient;
