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

        // create a book
        app.post('/api/books', async (req, res) => {
            try {
                const book = await Book.create(req.body);
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // get all books
        app.get('/api/books', async (req, res) => {
            try {
                const books = await Book.find();
                res.status(200).json(books);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // get a single book
        app.get('/api/books/:id', async (req, res) => {
            try {
                const {id} = req.params;
                const book = await Book.findById(id);
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        // update a product
        app.put('/api/books/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findByIdAndUpdate(id, req.body);
            if (!book ) {
                return res.status(404).json({ message: "Book not found!" });
            }

            const updatedBook = await Book.findById(id);
            res.status(200).json(updatedBook);
            } catch (error) {
            res.status(500).json({ message: error.message });
            }
        });

        // delete a product
        app.delete('/api/books/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const book = await Book.findByIdAndDelete(id);
                if (!book) {
                    return res.status(404).json({ message: "Book not found!" });
                }

                res.status(200).json({ message: "Book deleted successfully!" });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

    } catch (error) {
        console.log("Connection failed!", error);
    }
}

run().catch(console.dir);
