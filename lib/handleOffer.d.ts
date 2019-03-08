import { uWebSocket } from "./server";
export interface KnownOfferPayload {
    type: 'offer';
    to: string;
    sdp: string;
}
export interface UnknownOfferPayload {
    type: 'offer';
    connectionId: string;
    sdp: string;
}
declare type OfferPayload = KnownOfferPayload | UnknownOfferPayload;
declare const handleOffer: (ws: uWebSocket, payload: OfferPayload) => void;
export default handleOffer;
