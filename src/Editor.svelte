<script>
  import { 
    // onMount, 
    onDestroy } from 'svelte'
  import { userScript, showEditor } from './store'
  // import { editor as MonacoEditor } from 'monaco-editor';
  let editor, modelChangeSub
  // onMount(mountEditor)
  function mountEditor() {
    setTimeout(() => {
      import("monaco-editor").then(monaco => {
        editor = monaco.editor.create(document.getElementById('monaco-container'), {
          value: $userScript.split(`
`).join('\n'),
          language: 'css',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          tabSize: 2,
          theme: "vs-dark",
          minimap: {
            enabled: false
            // renderCharacters: false
          }
        });
        modelChangeSub = editor.getModel().onDidChangeContent(v => {
          userScript.set(editor.getModel().getValue())
        })
      })
    }, 200)
  }
  userScript.subscribe(v => {
    if (!editor || !editor.getModel()) return
    const curVal = editor.getModel().getValue()
    if (curVal !== v) {
      editor.setValue(v)
    }
  })
  onDestroy(() => {
    if (editor) {
      editor.dispose();
      const model = editor.getModel();
      if (model) model.dispose();
    }
    if (modelChangeSub) modelChangeSub.dispose()
  })

</script>

<style>
  #monaco-container {
    height: 100%;
    width: 100%;
  }
</style>

<div id="monaco-container"></div>
