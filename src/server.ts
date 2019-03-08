import * as uWS from 'uWebSockets.js'
import WebSocketContext from "./WebSocketContext";
import handleSignal from "./handleSignal";

export interface uWebSocket extends uWS.WebSocket{
  context: WebSocketContext
}

const PORT = 9001

uWS
  .App({})
  .ws('/*', {
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 1e7,
    open: (ws, req) => {
      const key = req.getUrl().slice(1)
      if (!key) {
        ws.close()
        return
      }
      (ws as any).context = new WebSocketContext(['abc'])
    },
    message: (ws, message, isBinary) => {
      if (!isBinary) {
        const str = Buffer.from(message).toString()
        let payload
        try {
          payload = JSON.parse(str)
        } catch (e) {
          console.log('Err payload', str)
          ws.publish('home/sensors/temperature', str);
          return
        }
        if (payload.type !== 'candidate') {
          console.log('got payload', payload)
        }
        handleSignal(ws as uWebSocket, payload)
      } else {
        console.log('got message', message)
      }
    },
    close: (_ws, code, message) => {
      console.log('closed', code, message)
    }
  })
  .any('/*', (res, _req) => {
    res.end('End')
  })
  .listen(PORT, (listenSocket) => {
    if (listenSocket) {
      console.log('listening to port', PORT)
    } else {
      console.log('listen failed')
    }
  })
