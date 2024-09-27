const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Book = require('./models/book.model.js');

const app = express();
const uri = "mongodb+srv://Miki:_2vuKgZQ3LK9F$P@backenddb.kfcx6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

app.use(express.json());

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to Database!");

        app.get('/', (req, res) => {
            res.send('Hello from port 5000 updated!');
        });

        app.post('/api/books', async (req, res) => {
            try {
                const book = new Book(req.body);
                await book.save();
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        console.log("Connection failed!", error);
    }
}

run().catch(console.dir);