import { InitPayload } from "./handleInit";
import ConnectionChunk from "./ConnectionChunk";
declare type WebSocketId = string;
export default class WebSocketContext {
    id?: string;
    createdAt: number;
    rooms: string[];
    acceptedOffers: {
        [connectionId: string]: WebSocketId;
    };
    pushQueue: ConnectionChunk[];
    pullQueue: string[];
    constructor(rooms: string[]);
    init(payload: InitPayload): void;
    pushOffer(connectionId: string, sdp: string): void;
}
export {};
