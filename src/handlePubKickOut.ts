import {uWebSocket} from "./server";

export interface PubKickOutPayload {
  type: 'pubKickOut',
  createdAt: number
}

const handlePubKickOut = (ws: uWebSocket, payload: PubKickOutPayload) => {
  if (ws.context.createdAt === payload.createdAt) {
    ws.end(1006, 'Duplicate id')
  }
}

export default handlePubKickOut
