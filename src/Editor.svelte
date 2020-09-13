<script>
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { MonacoBinding } from 'y-monaco'

  import * as Y from 'yjs'
  // import { WebrtcProvider } from 'y-webrtc'
  import { WebsocketProvider } from 'y-websocket'
  import { IndexeddbPersistence } from 'y-indexeddb'
  
  import {roomName} from './store'
  
  let websocketProvider, monacoBinding
  const ydoc = new Y.Doc()
  
  onMount(() => {
      const editor = monaco.editor.create(document.getElementById('monaco-container'), {
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
  })

  const unsubscribe = roomName.subscribe(room => {
    loadRoom(room)
  });

  function loadRoom(roomName){
    console.log("loading new room:", roomName)
    if(websocketProvider != undefined){
      websocketProvider.disconnect()
    }
    websocketProvider = new WebsocketProvider(
      'wss://demos.yjs.dev', roomName, ydoc
    )
    websocketProvider.on('status', event => {
      console.log(event.status) // logs "connected" or "disconnected"
    })

    // assign text to store
    let ymap = ydoc.getMap('fileMap')
    console.log(ymap, ymap.entries());
    if (undefined === ymap.get("files")) {
      const fileMap = new Y.Map({"main": {name: "main", content: "---"}})
      ymap.set("files", fileMap)
    }
    console.log(ymap, ymap.entries());

    // Bind Yjs to the editor model
    monacoBinding = new MonacoBinding(ymap.get("files").get("main").content, editor.getModel(), new Set([editor]), websocketProvider.awareness)
  }
</script>

<style>
  #monaco-container {
    height: 100%;
    width: 100%;
  }
</style>

<div id="monaco-container"></div>
