<script>
    import { roomName } from './store'
    import Input from './Input.svelte'
</script>

<Input type="text" bind:value={$roomName} />