import {uWebSocket} from "./server";
import ConnectionChunk from "./ConnectionChunk";

const sendChunk = (ws: uWebSocket, connectionChunk: ConnectionChunk, requestor: string) => {
  const {connectionId, signals} = connectionChunk
  // tell the offerer that their offer was accepted by payload.from
  ws.send(JSON.stringify({type: 'offerAccepted', connectionId, from: requestor}), false, false)
  // give the requestor all the signals
  ws.publish(`signal/user/${requestor}`, JSON.stringify({
    type: 'pubToClient',
    payload: {type: 'accept', signals, from: ws.context.id}
  }))
  // forward future connection requests to the peer
  ws.context.acceptedOffers[connectionId] = requestor
}

export default sendChunk
