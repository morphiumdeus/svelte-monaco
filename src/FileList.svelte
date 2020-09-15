<script>
    import { roomName, ydoc, activeFile } from './store'

    let files = { has: () => false}
    const unsubscribe = ydoc.subscribe(value => {
        console.log(value, $ydoc)
        if(value.getMap('fileMap') && value.getMap('fileMap').has('files'))
        files = value.getMap('fileMap')
    })
</script>

<style>
    .selected {
        font-weight: bold;
    }
</style>

<ul>
    {#if files.has('files')}
        {#each files.getMap('files').keys() as file}
            <li class:selected={file == activeFile}>{file}</li>
        {/each}
    {/if}
</ul>