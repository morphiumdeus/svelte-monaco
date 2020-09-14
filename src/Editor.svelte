<script>
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { MonacoBinding } from 'y-monaco'

  import * as Y from 'yjs'
  // import { WebrtcProvider } from 'y-webrtc'
  import { WebsocketProvider } from 'y-websocket'
  import { IndexeddbPersistence } from 'y-indexeddb'
  
  import {roomName} from './store'
  
  let websocketProvider, monacoBinding, editor
  let data = {}
  let ydoc = new Y.Doc()
  
  onMount(() => {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: "yaml"
    })


    // this allows you to instantly get the (cached) documents data
    //const indexeddbProvider = new IndexeddbPersistence(roomName, ydoc)
    //indexeddbProvider.whenSynced.then(() => {
    //  console.log('loaded data from indexed db')
    //})

    // Sync clients with the y-webrtc provider.
    // const webrtcProvider = new WebrtcProvider(roomName, ydoc)

    // Sync clients with the y-websocket provider
    console.log($roomName)
    loadRoom($roomName)
    
    /*const unsubscribe = roomName.subscribe(room => {
      console.log("room name changed: "+ room);
      loadRoom(room)
    });*/
  })

  function loadRoom(roomName){
    console.log("loading new room:", roomName)
    if(websocketProvider != undefined){
      websocketProvider.disconnect()
    }
    if(monacoBinding != undefined){
      monacoBinding.destroy()
    }
    ydoc = new Y.Doc()
    websocketProvider = new WebsocketProvider(
      `${location.protocol === 'http:' ? 'ws:' : 'wss:'}//demos.yjs.dev`, roomName, ydoc
    )
    websocketProvider.on('status', event => {
      console.log(event.status) // logs "connected" or "disconnected"
      if(event.status == "connected"){
            
        // assign text to store
        let ymap = ydoc.getMap('fileMap')
        if (undefined === ymap.get("files")) {
          const fileMap = new Y.Map()
          const mainFile = new Y.Map()
          const mainContent = new Y.Text("---")
          mainFile.set("content", mainContent)
          fileMap.set("main", mainFile)
          ymap.set("files", fileMap)
        }
        console.log(ymap, ymap.entries());
        for(let [fileName, file] of ymap.get("files")){
          console.log(fileName, file.get("content").toString());
          data[fileName] = {}
          data[fileName].model = monaco.editor.createModel(file.get("content").toString(), 'yaml')
        }
        editor.setModel(data["main"].model)

        // Bind Yjs to the editor model
        monacoBinding = new MonacoBinding(ymap.get("files").get("main").get("content"), data["main"].model, new Set([editor]), websocketProvider.awareness)

      }
    })
  }
</script>

<style>
	#monaco-container {
		position: absolute;
		top: 0;
		height: 100vh;
		left: 20vw;
		width: 30vw;
	}
</style>

<div id="monaco-container"></div>
