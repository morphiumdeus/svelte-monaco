<script>
    import { roomName, ydoc, activeFile } from './store'
    let files = {}
    const unsubscribe = ydoc.subscribe(value => {
        console.log(value)
        try {
            files = value.getMap('fileMap').getMap('files')
            console.log(files);
        } catch (e) {
            if (e instanceof TypeError) {
                console.log(e);
            } else {
                console.log(e);
            }
        }
    })
</script>

<style>
    .selected {
        font-weight: bold;
    }
</style>

<ul>
	{#each files.keys() as file}
		<li class:selected={file == activeFile}>{file}</li>
	{/each}
</ul>