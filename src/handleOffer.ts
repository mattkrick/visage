import {uWebSocket} from "./server";
import OfferSignal from "./OfferSignal";
import sendChunk from "./sendChunk";

export interface KnownOfferPayload {
  type: 'offer'
  to: string
  sdp: string
}

export interface UnknownOfferPayload {
  type: 'offer'
  connectionId: string
  sdp: string
}

type OfferPayload = KnownOfferPayload | UnknownOfferPayload

const handleOffer = (ws: uWebSocket, payload: OfferPayload) => {
  const {sdp} = payload
  const to = 'to' in payload ? payload.to : ws.context.acceptedOffers[payload.connectionId]
  if (to) {
    // the receiver is known
    ws.publish(`signal/user/${to}`, JSON.stringify({type: 'pubToClient', payload: {type: 'offer', from: ws.context.id, sdp}}))
    return
  }
  const {connectionId} = payload as UnknownOfferPayload
  const existingChunk = ws.context.pushQueue.find(
    (connectionSignal) => connectionSignal.connectionId === connectionId
  )
  if (existingChunk) {
    // the offer is just a piece of a larger connectionChunk
    existingChunk.signals.push(new OfferSignal(sdp))
    return
  }

  ws.context.pushOffer(connectionId, sdp)
  const requestor = ws.context.pullQueue.pop()
  if (requestor) {
    const connectionChunk = ws.context.pushQueue.pop()!
    sendChunk(ws, connectionChunk, requestor)
  }
}

export default handleOffer
