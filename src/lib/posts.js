import { db } from './database.js';

export const getAllPosts = async (columns = []) => {
    const query = db.from('posts')
        .orderBy('created', 'desc');

    if (columns.length > 0) {
        query.columns(columns);
    }

    return query;
};

export const getPostBySlug = async (slug, columns = []) => {
    const query = db.from('posts');

    if (columns.length > 0) {
        query.select(columns)
    }

    const results = await query.where({ slug });
    if (results.length > 0) {
        return results[0];
    }

    return false;
};

export const getDisplayPostBySlug = async (slug) => {
    return getPostBySlug(slug, ['slug', 'title', 'created', 'parsed_contents']);
};

export const updatePostBySlug = async (slug, data) => {
    return db('posts')
        .where({ slug })
        .update(data);
};

export const createPost = async (data) => {
    return db('posts').insert(data);
};
