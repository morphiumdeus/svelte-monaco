<script>
    import { roomName, ydoc } from './store'
    if($roomName === ''){        
	    const greg = require("greg")
        const sentence = greg.sentence()
        $roomName = sentence.replaceAll(" ", "-")
        console.log("The sentence \"%s\" corresponds to the id %d", $roomName, greg.parse($roomName.replaceAll("-", " ")))
    }
    const unsub = roomName.subscribe(room => {
        console.log
    })
	</script>

<style>
    input {
        width: 100%;
    }
</style>

<input bind:value={$roomName} />