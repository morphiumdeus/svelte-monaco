<script>
  import * as Y from 'yjs'
  // import { WebrtcProvider } from 'y-webrtc'

  import { roomName, ydoc, websocketProvider } from './store'

  const unsubscribe = roomName.subscribe(roomName => {
    console.log("room name changed: "+ roomName)
    changeRoom(roomName)
  })

  function changeRoom(roomName){
    data.webSocket.changeRoom(roomName)
    data.indexeddb.changeRoom(roomName)
    ydoc.reset()
  }

  const data = {
    webSocket: {
      websocketProvider: null,
      connect: (roomName) => {
        this.websocketProvider = new WebsocketProvider(
          `${location.protocol === 'http:' ? 'ws:' : 'wss:'}//demos.yjs.dev`, roomName, ydoc
        )
        this.websocketProvider.on('status', event => {
          websocketProvider.set(this.websocketProvider)
          console.log(event.status) // logs "connected" or "disconnected"
          if(event.status == "connected"){
            let ymap = ydoc.getMap('fileMap')
            if (undefined === ymap.get("files")) {
              createEmptyProject(ymap)
            }
          }
        })
      },
      changeRoom: (roomName) => {
        if(websocketProvider !== null && websocketProvider !== undefined){
          this.websocketProvider.disconnect()
        }
        this.connect(roomName)
      }
    },
    // this allows you to instantly get the (cached) documents data
    indexeddb: {
      indexeddbProvider: null,
      connect: (roomName) => {
        this.indexeddb = new IndexeddbPersistence(roomName, ydoc)
      }
    },
      changeRoom: (roomName) => {
        this.connect(roomName)
      }
  }

  function createEmptyProject(ymap){
    const fileMap = new Y.Map()
    fileMap.set("main", createEmptyFile())
    ymap.set('files', fileMap)
  }
  function createEmptyFile(){
    const file = new Y.Map()
    const content = new Y.Text("---")
    file.set("content", content)
    file.set("createDate", new Date())
    return file
  }
  

</script>