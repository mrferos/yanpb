import { getPostBySlug, updatePostBySlug } from '../../../../lib/posts';

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	const post = await getPostBySlug(slug);

	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(post));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

export async function post(req, res, next) {
	const { slug } = req.params;
	const { parsed_contents, raw_contents, title } = req.body;

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	try {
		const result = await updatePostBySlug(slug, {
			raw_contents,
			parsed_contents,
			title
		});

		res.end(JSON.stringify({saved: true, slug }));
	} catch (e) {
		res.end(JSON.stringify({
			saved: false,
			error: e
		}));
	}
}
