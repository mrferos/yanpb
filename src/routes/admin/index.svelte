<script context="module">
    import HtmlTitle from '../../components/HtmlTitle.svelte';
    import format from 'date-fns/format';

	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

	ul li span {
	    color: #555555;
	    font-size: 0.8em;
	}
</style>

<HtmlTitle title="Blog" />

<h1>Posts - <a href="/admin/posts/add">Add</a></h1>

<ul>
	{#each posts as post}
		<li>
		    <a href='admin/posts/edit/{post.slug}'>{post.title}</a>
		    <span> - {format(new Date(post.created), 'yyyy/MM/dd')}</span>
		</li>
	{/each}
</ul>
