<script>
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { MonacoBinding } from 'y-monaco'
  
  import {roomName, ydoc, websocketProvider} from './store'
  
  let monacoBinding, editor
  let data = {}
  let files = { has: () => false}
  const unsubscribe = ydoc.subscribe(value => {
    console.log(value, $ydoc)
    if(value.getMap('fileMap') && value.getMap('fileMap').has('files'))
    files = value.getMap('fileMap')
    loadRoom(roomName)
  })
  
  onMount(() => {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: "yaml"
    })

    const unsubscribe = roomName.subscribe(room => {
      console.log("room name changed: "+ room)
      if(files.has('files')){
        loadRoom(room)
      }
    })
  })

  function loadRoom(roomName){
    if(monacoBinding != undefined){
      monacoBinding.destroy()
    }    
    console.log(ydoc.get('fileMap'), ydoc.get('fileMap').get("files").get("main").get("content"));
    for(let [fileName, file] of ydoc.get('fileMap').get("files")){
      console.log(fileName, file.get("content").toString());
      data[fileName] = {}
      data[fileName].model = monaco.editor.createModel(file.get("content").toString(), 'yaml')
    }
    loadFileIntoEditor("main")
      
  }
  function loadFileIntoEditor(fileName){
    editor.setModel(data[fileName].model)
    // Bind Yjs to the editor model
    monacoBinding = new MonacoBinding(ydoc.get('fileMap').get("files").get(fileName).get("content"), data[fileName].model, new Set([editor]), websocketProvider.awareness)
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
