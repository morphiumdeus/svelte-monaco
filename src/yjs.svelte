<script>
import * as Y from 'yjs'
// import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'

import { editorText, websocketProvider } from './store'

export let roomName
export let fileName = "editorText"

const ydoc = new Y.Doc()

console.log(roomName)
// this allows you to instantly get the (cached) documents data
//const indexeddbProvider = new IndexeddbPersistence(roomName, ydoc)
//indexeddbProvider.whenSynced.then(() => {
//  console.log('loaded data from indexed db')
//})

// Sync clients with the y-webrtc provider.
// const webrtcProvider = new WebrtcProvider(roomName, ydoc)

// Sync clients with the y-websocket provider
$websocketProvider = new WebsocketProvider(
  'wss://demos.yjs.dev', roomName, ydoc
)
websocketProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

// assign text to store
$editorText = ydoc.getText(fileName)

editorText.observe(event => {
  // print updates when the data changes
  console.log('text changed: ' + editorText)
})

</script>