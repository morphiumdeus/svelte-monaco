<script>
  import * as monaco from 'monaco-editor'
  import editorText from './store'

  const editor = monaco.editor.create(document.getElementById('monaco-editor'), {
    value: '', // MonacoBinding overwrites this value with the content of type
    language: "yaml"
  })

  // Bind Yjs to the editor model
  const monacoBinding = new MonacoBinding($editorText, editor.getModel(), new Set([editor]), provider.awareness)

</script>

<style>
  #monaco-container {
    height: 100%;
    width: 100%;
  }
</style>

<div id="monaco-container"></div>
