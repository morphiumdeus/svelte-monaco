<script>
	import Editor from './Editor.svelte';
	import Yjs from './yjs.svelte'
</script>

<style>
	#editor {
		position: absolute;
		top: 0;
		height: 100vh;
		left: 20vw;
		width: 30vw;
	}
</style>

<div id="editor">
	<Editor roomName="svelte-test-monaco" />
</div>