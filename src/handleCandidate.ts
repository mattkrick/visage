import {uWebSocket} from "./server";
import CandidateSignal from "./CandidateSignal";

export interface KnownCandidatePayload {
  type: 'offer'
  to: string
  candidate: object | null
}

export interface UnknownCandidatePayload {
  type: 'offer'
  connectionId: string
  candidate: object | null
}

type CandidatePayload = KnownCandidatePayload | UnknownCandidatePayload

const handleCandidate = (ws: uWebSocket, payload: CandidatePayload) => {
  const {candidate} = payload
  if (!candidate) return
  const to = 'to' in payload ? payload.to : ws.context.acceptedOffers[payload.connectionId]
  if (to) {
    // the receiver is known
    ws.publish(`signal/user/${to}`, JSON.stringify({type: 'pubToClient', payload: {type: 'candidate', from: ws.context.id, candidate}}))
    return
  }
  const {connectionId} = payload as UnknownCandidatePayload
  const existingChunk = ws.context.pushQueue.find(
    (connectionSignal) => connectionSignal.connectionId === connectionId
  )
  if (existingChunk) {
    existingChunk.signals.push(new CandidateSignal(candidate))
  }
}

export default handleCandidate
