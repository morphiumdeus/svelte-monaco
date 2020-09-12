<script>
    import { Input } from 'svelma'

    import { roomName } from './store'
</script>

<Input type="text" bind:value={$roomName} />