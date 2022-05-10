import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../shared/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  onBooksChanged = new Subject<Book[]>();
  saveLibraryBookSubject = new Subject<Book>();

  private myBookshelfBooks: Book[] = [];

  // CREATE (one)
  saveBookToBookshelf(book: Book) {
    this.myBookshelfBooks.push(book);

    this.onBooksChanged.next(this.myBookshelfBooks.slice());
  }

  // READ (many)
  getBookshelfBooks() {
    return this.myBookshelfBooks.slice();
  }

  // READ (one)
  getBookshelfBook(index: number) {
    return this.myBookshelfBooks.slice()[index];
  }

  // UPDATE (one)
  updateBookshelfBook(index: number, updatedBookDetails: Book) {
    this.myBookshelfBooks[index] = updatedBookDetails;
    this.onBooksChanged.next(this.myBookshelfBooks.slice());
  }

  // UPDATE (many)
  setBookshelfBooks(newBooks: Book[] = []) {
    this.myBookshelfBooks = newBooks;
    this.onBooksChanged.next(this.myBookshelfBooks.slice());
  }

  // DELETE (one)
  removeBookFromBookshelf(idx: number) {
    if (idx >= this.myBookshelfBooks.length || idx < 0) return;

    this.myBookshelfBooks.splice(idx, 1);

    this.onBooksChanged.next(this.myBookshelfBooks.slice());
  }
}
