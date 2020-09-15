<script>
    import FileList from "./FileList.svelte"
    import RoomInput from "./RoomInput.svelte"
    

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
    <RoomInput />
    <FileList />
</div>