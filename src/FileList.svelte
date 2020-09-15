<script>
    import { roomName, ydoc, activeFile } from './store'
    
    $: files = ydoc.getMap('fileMap').get("files")
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