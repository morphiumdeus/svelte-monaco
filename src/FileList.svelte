<script>
    import { roomName } from './store'
    import { data } from './yjsManager.svelte'

    let model = { has: () => false}
    const unsubscribe = data.isReady.subscribe(isReady => {
        console.log(isReady)
        if(isReady){
            model = data.ydoc.getMap('model')
        }        
    })
</script>

<style>
    .selected {
        font-weight: bold;
    }
</style>

<ul>
    {#if model.has('files')}
        {#each model.getMap('files').keys() as file}
            <li class:selected={file == data.activeFile}>{file}</li>
        {/each}
    {/if}
</ul>