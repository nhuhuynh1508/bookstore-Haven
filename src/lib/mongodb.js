import { MongoClient } from 'mongodb';

let client;
let clientPromise;

import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

const options = {};

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
