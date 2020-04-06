import { db } from './database.js';

export const getAllPosts = async (columns = []) => {
    const query = db.from('posts');

    if (columns.length > 0) {
        query.columns(columns);
    }

    return query;
};

export const getDisplayPostBySlug = async (slug) => {
    const results = await db.from('posts')
        .select('slug', 'title', 'created', 'parsed_contents')
        .where({ slug });

    if (results.length > 0) {
        return results[0];
    }

    return false;
};
