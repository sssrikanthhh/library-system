const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;
app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/assignments');
  } catch (err) {
    console.log(err);
  }
};
connectDB();

// models

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checkId: { type: mongoose.Types.ObjectId, ref: 'checkTime' }
});

const User = mongoose.model('user', userSchema);

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookId: { type: mongoose.Types.ObjectId, ref: 'book' }
}, {
  versionKey: false,
  timestamps: true
});

const Section = mongoose.model('section', sectionSchema);

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  authorId: { type: mongoose.Types.ObjectId, required: true },
  sectionId: { type: mongoose.Types.ObjectId, ref: 'section' }
}, {
  versionKey: false,
  timestamps: true
});

const Book = mongoose.model('book', bookSchema);

const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  bookId: { type: mongoose.Types.ObjectId, ref: 'book' }
}, {
  versionKey: false,
  timestamps: true
});

const Author = mongoose.model('author', authorSchema);

const checkSchema = new mongoose.Schema({
  bookId: { type: mongoose.Types.ObjectId, ref: 'book' },
  checkedOutTime: { type: Date, default: null },
  checkedInTime: { type: Date, default: null },
});

const CheckedTime = mongoose.model('checkTime', checkSchema);

app.post('/users', async (req, res) => {
  try {
    const user = await Section.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

// section 

app.get('/sections/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

app.post('/sections', async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

// books

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
    return res.status(201).send(books);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(201).send(book);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).send(book);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

// author

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();
    return res.status(201).send(authors);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    return res.status(201).send(author);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

app.post('/authors', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).send(author);
  } catch (err) {
    return res.status(501).send({ err });
  }
});

// books from specific author

app.get('/authors/:authorId/books', async (req, res) => {
  ;
  try {
    const books = await Book.find({ authorId: req.params.authorId }).lean().exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// books from section
app.get('/sections/:sectionId/books', async (req, res) => {
  ;
  try {
    const books = await Book.find({ sectionId: req.params.sectionId }).lean().exec();
    return res.status(200).send(books);
  } catch (err) {
    return res.status(500).send({ err });
  }
});



app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});