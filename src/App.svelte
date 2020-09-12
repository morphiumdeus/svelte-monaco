<script>
	import Editor from './Editor.svelte'
	const greg = require("greg")

	sentence = greg.sentence();

	console.log("The sentence \"%s\" corresponds to the id %d", sentence, greg.parse(sentence));
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