<script>
    import { roomName, ydoc, activeFile } from './store'

    let files = { has: () => false}
    const unsubscribe = ydoc.subscribe(value => {
        console.log(value)
        if(ydoc.getMap('fileMap') && ydoc.getMap('fileMap').has('files'))
        files = ydoc.getMap('fileMap')
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