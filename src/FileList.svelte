<script>
    import { roomName, ydoc, activeFile } from './store'
    let files = {}
    $: if(undefined !== $ydoc.getMap('fileMap')){
        if(undefined !== $ydoc.getMap('fileMap').getMap('files')){
            files = $ydoc.getMap('fileMap').getMap('files')
        }
    }
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