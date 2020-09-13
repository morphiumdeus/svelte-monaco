<script>
    import { roomName } from './store'    
</script>

<style>
    #file-menu {
        position: absolute;
        left: 0;
        top: 0;
        height: 100 vh;
    }
</style>

<div id="file-menu">
    <input bind:value={$roomName} />
</div>