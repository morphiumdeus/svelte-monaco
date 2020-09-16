<script>
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { MonacoBinding } from 'y-monaco'
  
  import { roomName, yjsIsReady } from './store'
  import { data } from './yjsManager.svelte'
  
  let monacoBinding, editor
  let monacoModels = {}
  
  onMount(() => {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: "yaml"
    })

    const unsubscribe = yjsIsReady.subscribe(isReady => {
      console.log(isReady)
      if(isReady){
        model = data.ydoc.getMap('model')
        loadRoom(roomName)
      }        
    })
  })

  function loadRoom(roomName){
    if(monacoBinding != undefined){
      monacoBinding.destroy()
    }
    console.log(model.getMap('files'));
    for(let [fileName, file] of files.getMap('files')){
      console.log(fileName, file.get("content").toString())
      monacoModels[fileName] = monaco.editor.createModel(file.get("content").toString(), 'yaml')
    }
    loadFileIntoEditor("main")
      
  }
  function loadFileIntoEditor(fileName){
    editor.setModel(monacoModels[fileName])
    // Bind Yjs to the editor model
    monacoBinding = new MonacoBinding(model.getMap('files').get(fileName).get("content"), monacoModels[fileName], new Set([editor]), data.websocketProvider.awareness)
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
