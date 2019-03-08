import {uWebSocket} from "./server";
import sendChunk from "./sendChunk";

export interface PubInitPayload {
  type: 'pubInit'
  createdAt: number
  from: string
}

const handlePubInit = (ws: uWebSocket, payload: PubInitPayload) => {
  if (payload.from === ws.context.id) {
    if (ws.context.createdAt < payload.createdAt) {
      // the publishing websocket used an id that was already taken, kick em out
      ws.publish(`signal/${payload.from}`, JSON.stringify({type: 'pubKickOut', createdAt: payload.createdAt}))
    }
    return
  }
  const connectionChunk = ws.context.pushQueue.pop()
  if (!connectionChunk) {
    ws.context.pullQueue.push(payload.from)
  } else {
    sendChunk(ws, connectionChunk, payload.from)
    // ask the offerer for another sdp
    ws.send(JSON.stringify({type: 'offerRequest'}), false, false)
  }
}

export default handlePubInit
