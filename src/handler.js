const { nanoid } = require('nanoid');
const books = require('./books');


const addBookHandler = (request, h) => {
  // Get properties from request body and define variables
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Define new book properties
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Response when request body does not have `name`
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  // Response when `readPage` higher than `pageCount`
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  // Add new book to books list
  books.push(newBook);

  // Check is .push() success
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Response if success and follow all criteria
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  };

  // Response if not success
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(500);
  return response;
};


const getAllBooksHandler = (request, h) => {
  // Get query parameters
  const { name, reading, finished } = request.query;

  // Define filteredBooks
  let filteredBooks = books;

  // Filter by name
  if (name !== undefined) {
    const lowerName = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(lowerName));
  };

  // Filter by reading
  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  };

  // Filter by finished
  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  };

  // Define simplified books object
  const simplifiedBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  // Response if success
  const response = h.response({
    status: 'success',
    data: {
      'books': simplifiedBooks,
    },
  });
  response.code(200);
  return response;
};


const getBookByIdHandler = (request, h) => {
  // Get `id` from request body
  const { id } = request.params;

  // Select book based on `id`
  const book = books.filter((b) => b.id === id)[0];

  // Response if success, book NOT undefined
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  };

  // Response if not success
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};


const editBookByIdHandler = (request, h) => {
  // Get `id` from request body
  const { id } = request.params;

  // Get properties
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  // Define `updatedAt`
  const updatedAt = new Date().toISOString();

  // Find index
  const index = books.findIndex((book) => book.id === id);

  // Response if `name` not in request body
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  // Response when `readPage` higher than `pageCount`
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  // If index found, update properties
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    // Response if success
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  };

  // Response if not success
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


const deleteBookByIdHandler = (request, h) => {
  // Get `id` from request body
  const { id } = request.params;

  // Find index
  const index = books.findIndex((book) => book.id === id);

  // If index found, delete book
  if (index !== -1) {
    books.splice(index, 1);

    // Response if success
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Response if not success
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};