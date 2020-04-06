<script>
    export let doPrepend = true;
    export let prependText = 'Andres Galindo | ';
    export let title;
</script>

<svelt:head>
    <title>{ doPrepend ? prependText : ''}{title}</title>
</svelt:head>
