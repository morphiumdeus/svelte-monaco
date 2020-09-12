<script>
	import Editor from './Editor.svelte'
	import Menu from './Menu.svelte'
	import { roomName } from './store'
	const greg = require("greg")

	$roomName = greg.sentence()
	console.log("The sentence \"%s\" corresponds to the id %d", $roomName, greg.parse($roomName))
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
	<Menu room=$roomName />
	<Editor bind:$roomName />
</div>