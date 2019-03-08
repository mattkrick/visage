import {uWebSocket} from "./server";

interface AnswerPayload {
  type: 'answer',
  sdp: string
  to: string
}

const handleAnswer = (ws: uWebSocket, payload: AnswerPayload) => {
  const { sdp, to } = payload
  ws.publish(`signal/user/${to}`, JSON.stringify({type: 'pubToClient', payload: {type: 'answer', from: ws.context.id, sdp}}))
}

export default handleAnswer
