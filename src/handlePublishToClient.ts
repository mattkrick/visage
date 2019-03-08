import {uWebSocket} from "./server";

interface PublishToClientPayload {
  type: 'pubToClient',
  payload: any
}

const handlePublishToClient = (ws: uWebSocket, payload: PublishToClientPayload) => {
  ws.send(JSON.stringify(payload), false, false)
}

export default handlePublishToClient
