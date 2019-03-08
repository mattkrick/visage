import {InitPayload} from "./handleInit";
import ConnectionChunk from "./ConnectionChunk";

type WebSocketId = string
export default class WebSocketContext {
  id?: string
  createdAt: number
  rooms: string[]
  acceptedOffers: { [connectionId: string]: WebSocketId } = {}
  pushQueue: ConnectionChunk[] = []
  pullQueue: string[] = []

  constructor(rooms: string[]) {
    this.rooms = rooms
    this.createdAt = Date.now()
  }

  init(payload: InitPayload) {
    const {from: id, connectionId, sdp} = payload
    this.id = id
    this.pushOffer(connectionId, sdp)
  }

  pushOffer(connectionId: string, sdp: string) {
    this.pushQueue.push(new ConnectionChunk(connectionId, sdp))
  }
}
