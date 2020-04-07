<script context="module">
    import HtmlTitle from '../../../../components/HtmlTitle.svelte';
    import PostEditor from '../../../../components/PostEditor.svelte';

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`admin/posts/edit/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>
<script>
export let post;
</script>
<PostEditor post={post} />


