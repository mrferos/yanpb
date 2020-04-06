<script>
    import HtmlTitle from '../components/HtmlTitle.svelte';
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
		border-radius: 15em;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<HtmlTitle title={"Welcome to my blog"} />

<h1>Sup.</h1>

<figure>
	<img alt='Borat' src='agalindo.png'>
	<figcaption>I'm Andres.</figcaption>
</figure>

<p><strong>This is an attempt at a personal blog.</strong></p>
