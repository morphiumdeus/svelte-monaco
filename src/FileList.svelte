<script>
    import { roomName, ydoc, activeFile } from './store'
    let files = {}
    const unsubscribe = ydoc.subscribe(value => {
        if(undefined !== value.getMap('fileMap')){
            if(undefined !== value.getMap('fileMap').getMap('files')){
                files = value.getMap('fileMap').getMap('files')
                console.log(files);
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