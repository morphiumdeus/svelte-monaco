<script>
    import { Textfield } from '@smui/textfield'

    import { roomName } from './store'
</script>

<Textfield bind:value={$roomName} label="$roomName" input$aria-controls="helper-text-standard-a" input$aria-describedby="helper-text-standard-a" />