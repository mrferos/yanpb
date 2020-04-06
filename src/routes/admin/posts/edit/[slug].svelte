<script context="module">
    import HtmlTitle from '../../../../components/HtmlTitle.svelte';
    import marked from 'marked';

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

<style>
.title {
    width: 100%;
    max-width: 100%;
    font-weight: bold;
    font-size: 3em;
    padding: 0.05em;
    border: .02em solid #ccc;
    overflow-y: auto;
    max-height: 1.5em;
    white-space: nowrap;
}

.contents {
    margin-top: 2em;
    border: .05em solid #ccc;
    padding: 1em;
}

.raw-contents {
    min-height: 25em;
    max-height: 25em;
    overflow-x: auto;
}

[contenteditable]:focus {
    outline: 0px solid transparent
}

.options {
    width: 100%;
    height: 2em;
    border-bottom: 0.05em solid #ccc;
    margin-bottom: 0.5em;
}

.options ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    float: right;
}

.options ul li {
    float: left;
    cursor: pointer;
}

.options ul li + li {
    float: left;
    margin-left: 1em;
}

</style>

<script>
	export let post;
	let postDate = new Date(post.created);
	let rawContents = post.raw_contents;
	let displayedRawContents = post.raw_contents;
	let formattedContents = post.parsed_contents;

	const STATE_RAW = 'raw';
	const STATE_FORMATTED = 'formatted';

	let targetContent = STATE_RAW;

    const handleContentSwitchClick = async () => {
        targetContent = targetContent === STATE_RAW ? STATE_FORMATTED : STATE_RAW;

        if (targetContent === STATE_FORMATTED) {
            formattedContents = marked(rawContents);
        }

        if (targetContent === STATE_RAW) {
            displayedRawContents = rawContents;
        }
    };

    const handleRawContentInput = (event) => {
        rawContents = event.target.innerText;
    };
</script>

<div class="title" contenteditable="true">
    {post.title}
</div>

<div class="contents">
    <div class="options">
        <ul>
            <li on:click={handleContentSwitchClick}>{@html
                targetContent == STATE_RAW ? '<strong>Raw</strong>' : 'Raw'
            }</li>
            <li on:click={handleContentSwitchClick}>{@html
                targetContent == STATE_FORMATTED ? '<strong>Formatted</strong>' : 'Formatted'
            }</li>
        </ul>
    </div>

    {#if targetContent === STATE_RAW }
    <div class="raw-contents" contenteditable="true" on:input={handleRawContentInput}>
        <pre>
            <code>
                {displayedRawContents}
            </code>
        </pre>
    </div>
    {/if}

    {#if targetContent === STATE_FORMATTED }
    <div class="formatted-contents">
        {@html formattedContents}
    </div>
    {/if}
</div>
