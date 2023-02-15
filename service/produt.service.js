import { client } from '../index.js';

export async function resuting() {
    return await client
        .db('E-commerce')
        .collection('product')
        .find({})
        .toArray();
}
