import {uWebSocket} from "./server";

export interface InitPayload {
  type: 'init'
  sdp: string
  connectionId: string
  from: string
}

const handleInit = (ws: uWebSocket, payload: InitPayload) => {
  // exit if a duplicate init payload is sent
  if (ws.context.id) return
  ws.context.init(payload)

  // channel to receive comms from other websockets, will verify payload.from is a UUID in pubInit
  ws.subscribe(`signal/user/${payload.from}`)
  console.log('sub to', `signal/user/${payload.from}`)
  const message = JSON.stringify({type: 'pubInit', from: payload.from})
  ws.context.rooms.forEach((room) => {
    ws.publish(`signal/room/${room}`, message)
    ws.subscribe(`signal/room/${room}`)
    console.log('sub to room', room)
  })
}

export default handleInit
