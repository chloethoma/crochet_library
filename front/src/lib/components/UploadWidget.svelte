<script>
    import {onMount} from 'svelte';

    let widget;

    onMount(() => {
        if ('cloudinary' in window) {
            widget = window.cloudinary.createUploadWidget({
                cloudName:'dcgmvmf04',
                uploadPreset:'pk7gc3l2'
            }, (error, result) => {
                console.log(result)
            });
            console.log(widget);
        }
    })

    const handleClick = () => {
        if (widget) {
            widget.open()
        }
    }
</script>

<button on:click|preventDefault={handleClick}>Upload photo</button>