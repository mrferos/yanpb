import { createPost } from '../../../lib/posts';
import slugify from 'slugify';

export async function post(req, res, next) {
    const { parsed_contents, raw_contents, title } = req.body;
    const slug = slugify(title).toLowerCase();

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    try {
        const result = await createPost({
            title,
            slug,
            parsed_contents,
            raw_contents,
            created: Date.now()
        });

        res.end(JSON.stringify({saved: true, slug}));
    } catch (e) {
        res.end(JSON.stringify({
            saved: false,
            error: e
        }));
    }
}
