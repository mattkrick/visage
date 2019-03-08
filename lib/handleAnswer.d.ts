import { uWebSocket } from "./server";
interface AnswerPayload {
    type: 'answer';
    sdp: string;
    to: string;
}
declare const handleAnswer: (ws: uWebSocket, payload: AnswerPayload) => void;
export default handleAnswer;
