<script>
	import Editor from './Editor.svelte'
	import Menu from './Menu.svelte'
	import { roomName } from './store'
	const greg = require("greg")

	$roomName = greg.sentence()
	console.log("The sentence \"%s\" corresponds to the id %d", $roomName, greg.parse($roomName))
</script>



<Menu />
<Editor />