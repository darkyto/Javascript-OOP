function solve() {
    'use strict';
    var library = (function () {
        var books = [],
            categories = [],
            result;

        function listBooks() {

            var args = arguments[0];

            if (args && args.category) {
                books = books.filter(function (a) {
                    return a.category === args.category;
                });
            } else if (args && args.author) {
                books = books.filter(function (a) {
                    return a.author === args.author;
                });
            } else if (args && args.isbn) {
                books = books.filter(function (a) {
                    return a.isbn === args.isbn;
                });
            } else if (args && args.title) {
                books = books.filter(function (a) {
                    return a.title === args.title;
                });
            } else {
                books = books.slice();
            }

            return books.sort(function (a, b) {
                return a.ID - b.ID;
            });
        }

        function addBook(book) {

            function checkCategory(book) {

                var i,
                    len = categories.length;

                for (i = 0; i < len; i += 1) {
                    if (book.category === categories[i]) {
                        return true;
                    }
                }

                return false;
            }

            function checkISBN(book) {

                var tempString = book.isbn.toString();

                if (tempString.length === 10 || tempString.length === 13) {
                    return true;
                }

            }

            function checkIfBookExist(book) {

                var i,
                    len = books.length;

                for (i = 0; i < len; i += 1) {
                    if (book.title === books[i].title) {
                        return false;
                    }
                    if (book.isbn === books[i].isbn) {
                        return false;
                    }
                }

                return true;
            }

            if (!checkIfBookExist(book)) {
                throw new Error('This book is already added!');
            }

            if (book.title.length < 2 || book.title.length > 100) {
                throw new Error('Invalid book title!');
            }

            if (typeof (book.author) !== 'string' || book.author === '') {
                throw new Error('Invalid author name!');
            }

            if (isNaN(book.isbn) || !checkISBN(book)) {
                throw new Error('invalid ISBN number!');
            }

            if (book.category.length < 2 || book.category.length > 100) {
                throw new Error('This book is already added!');
            }

            book.ID = books.length + 2;
            books.push(book);

            if (!checkCategory(book) || book.category === '') {
                categories.push(book.category);
            }

            return book;
        }

        function manualAddCategories(category) {

            category.ID = categories.length + 1;
            categories.push(category);
            return category;
        }

        function listCategories() {

            return categories.sort(function (a, b) {
                return a.ID - b.ID;
            });
        }

        result = {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories,
                add: manualAddCategories
            }
        };
        return result;
    }());

    return library;

}
module.exports = solve;