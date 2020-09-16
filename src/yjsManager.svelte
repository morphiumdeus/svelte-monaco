<script context='module'>
  export const data = {
    ydoc: new Y.Doc(),
    isReady: false,
    activeFile: 'main',
    websocketProvider: new WebsocketProvider(
          `${location.protocol === 'http:' ? 'ws:' : 'wss:'}//demos.yjs.dev`, roomName, data.ydoc
        )
  }
</script>

<script>
  import * as Y from 'yjs'
  import { WebsocketProvider } from 'y-websocket'
  // import { WebrtcProvider } from 'y-webrtc'

  import { roomName } from './store'

  const unsubscribe = roomName.subscribe(roomName => {
    console.debug("room name changed: "+ roomName)
    changeRoom(roomName)
  })

  function changeRoom(roomName){
    data.isReady = false
    webSocket.changeRoom(roomName)
    indexeddb.changeRoom(roomName)
    data.ydoc.reset()
  }

  const webSocket = {
      connect: (roomName) => {
        websocketProvider = new WebsocketProvider(
          `${location.protocol === 'http:' ? 'ws:' : 'wss:'}//demos.yjs.dev`, roomName, data.ydoc
        )
        websocketProvider.on('status', event => {
          console.debug(event.status) // logs "connected" or "disconnected"
          if(event.status == "connected"){
            let model = data.ydoc.getMap('model')
            if (undefined === model.get("files")) {
              console.debug('create a new project...')
              createEmptyProject(model)
            }            
          data.isReady = true
          }
        })
      },
      changeRoom: (roomName) => {
        if(websocketProvider !== null && websocketProvider !== undefined){
          this.websocketProvider.disconnect()
        }
        this.connect(roomName)
      }
    }

    // this allows you to instantly get the (cached) documents data
    const indexeddb = {
      indexeddbProvider: null,
      connect: (roomName) => {
        this.indexeddb = new IndexeddbPersistence(roomName, data.ydoc)
      },
      changeRoom: (roomName) => {
        this.connect(roomName)
      }
  }

  function createEmptyProject(ymap){
    const model = new Y.Map()
    model.set("main", createEmptyFile())
    ymap.set('files', model)
  }
  function createEmptyFile(){
    const file = new Y.Map()
    const content = new Y.Text("---")
    file.set("content", content)
    file.set("createDate", new Date())
    return file
  }
  

</script>