import OfferSignal from "./OfferSignal";
import CandidateSignal from "./CandidateSignal";
export default class ConnectionChunk {
    connectionId: string;
    signals: Array<OfferSignal | CandidateSignal>;
    constructor(connectionId: string, sdp: string);
}
