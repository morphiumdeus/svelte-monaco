<script>
	import Editor from './Editor.svelte'
	import Menu from './Menu.svelte'
	import { roomName } from './store'
	const greg = require("greg")

	const sentence = greg.sentence()
	$roomName = sentence.replaceAll(" ", "-")
	console.log("The sentence \"%s\" corresponds to the id %d", $roomName, greg.parse($roomName.replaceAll("-", " ")))
</script>



<Menu />
<Editor />