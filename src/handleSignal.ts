import {uWebSocket} from "./server";
import handleInit from "./handleInit";
import handlePubInit from "./handlePubInit";
import handlePubKickOut from "./handlePubKickOut";
import handleOffer from "./handleOffer";
import handlePublishToClient from "./handlePublishToClient";
import handleAnswer from "./handleAnswer";
import handleCandidate from "./handleCandidate";

type Handler = (ws: uWebSocket, payload: any) => void

const handlers = {
  init: handleInit,
  pubInit: handlePubInit,
  pubKickOut: handlePubKickOut,
  offer: handleOffer,
  pubToClient: handlePublishToClient,
  answer: handleAnswer,
  candidate: handleCandidate
} as {[key: string]: Handler}

const handleSignal = (
  ws: uWebSocket,
  payload: {type: string, [key: string]: any}
): boolean => {
  const { type } = payload
  const handler = handlers[type]
  if (!handler) return false
  handler(ws, payload)
  return true
}

export default handleSignal
