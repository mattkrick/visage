import { uWebSocket } from "./server";
export interface KnownCandidatePayload {
    type: 'offer';
    to: string;
    candidate: object | null;
}
export interface UnknownCandidatePayload {
    type: 'offer';
    connectionId: string;
    candidate: object | null;
}
declare type CandidatePayload = KnownCandidatePayload | UnknownCandidatePayload;
declare const handleCandidate: (ws: uWebSocket, payload: CandidatePayload) => void;
export default handleCandidate;
