import { client } from '../index.js';

export async function logout(email) {
    return await client
        .db("E-commerce")
        .collection("token")
        .deleteOne({ email: email });
}
export async function userToken(email) {
    return await client
        .db("E-commerce")
        .collection("token")
        .findOne({ email: email });
}
export async function storeUser(userFromDB, token) {
    return await client
        .db("E-commerce")
        .collection("token")
        .insertOne({
            email: userFromDB.email,
            my_token: token
        });
}
export async function getingUser(email) {
    return await client
        .db("E-commerce")
        .collection("sign up/in")
        .findOne({ email: email });
}
export async function users(userDetails) {
    return await client
        .db("E-commerce")
        .collection("sign up/in")
        .insertOne(userDetails);
}
