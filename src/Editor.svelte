<script>
  import * as monaco from 'monaco-editor'
  import { onMount } from 'svelte'
  import { MonacoBinding } from 'y-monaco'

  import { editorText } from './store'

  onMount(() => {
      const editor = monaco.editor.create(document.getElementById('monaco-container'), {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: "yaml"
    })

    // Bind Yjs to the editor model
    const monacoBinding = new MonacoBinding($editorText, editor.getModel(), new Set([editor]), provider.awareness)
  })
</script>

<style>
  #monaco-container {
    height: 100%;
    width: 100%;
  }
</style>

<div id="monaco-container"></div>
