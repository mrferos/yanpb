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

.raw-contents pre {
    all: unset;
    white-space: pre-line;
}

.formatted-contents {
    all: unset;
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

.actions {
    width: 100%;
    height: 1em;
    padding: 0.2em;
    border-top: 0.05em solid #ccc;
}

.actions button {
    float: right;
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
    import marked from 'marked';
    import dompurify from 'dompurify'

	export let post = {
        raw_contents: '',
        title: '',
        parsed_contents: ''
	};

	let rawContents = post.raw_contents;
	let title = post.title;
	let displayedRawContents = post.raw_contents;
	let formattedContents = post.parsed_contents;

	const STATE_RAW = 'raw';
	const STATE_FORMATTED = 'formatted';

	let targetContent = STATE_RAW;

    const handleContentSwitchClick = async () => {
        targetContent = targetContent === STATE_RAW ? STATE_FORMATTED : STATE_RAW;

        if (targetContent === STATE_FORMATTED) {
            formattedContents = dompurify.sanitize(marked(rawContents));
        }

        if (targetContent === STATE_RAW) {
            displayedRawContents = rawContents;
        }
    };

    const handleRawContentInput = (event) => {
        rawContents = event.target.innerText;
    };

    const handleTitleContentInput = (event) => {
        title = event.target.innerText;
    };

    const handleSaveClick = async (event) => {
        const didConf = confirm('Are you sure you want to save this?');
        if (!didConf) {
            return false;
        }

        if (rawContents !== post.raw_contents && formattedContents === post.parsed_contents) {
            formattedContents = dompurify.sanitize(marked(rawContents));
        }

        const uri = post.slug === undefined ?
            'admin/posts/add.json' : `admin/posts/edit/${post.slug}.json`;

        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                raw_contents: rawContents,
                parsed_contents: formattedContents
            })
        });

       const { slug } = await response.clone().json();
       alert('Saved!');
       const redirectPath = `/admin/posts/edit/${slug}`;
       if (redirectPath !== window.location.pathname) {
           window.location = redirectPath;
       }
    }
</script>

<div class="title" contenteditable="true" on:input={handleTitleContentInput}>
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
            {displayedRawContents}
        </pre>
    </div>
    {/if}

    {#if targetContent === STATE_FORMATTED }
    <div class="formatted-contents">
        {@html formattedContents}
    </div>
    {/if}

    <div class="actions">
        <button on:click|preventDefault={handleSaveClick}>Save</button>
    </div>
</div>
