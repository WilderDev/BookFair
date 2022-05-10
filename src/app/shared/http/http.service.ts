import { tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';

import { BookshelfService } from '../../bookshelf/bookshelf.service';
import { Book } from '../book/book.model';

const FIREBASE_DB_URL =
  "https://book-fair-3-default-rtdb.firebaseio.com/books.json";

@Injectable({ providedIn: "root" })
export class HTTPService {
  constructor(
    private http: HttpClient,
    private bookshelfService: BookshelfService
  ) {}

  // SAVE to Firebase DB
  saveBooksToFirebase() {
    const booksToSave = this.bookshelfService.getBookshelfBooks();

    this.http.put(FIREBASE_DB_URL, booksToSave).subscribe(res => {
      console.log("Firebase DB Res:", res);
    });
  }

  // FETCH from Firebase DB
  fetchBooksFromFirebase() {
    return this.http.get(FIREBASE_DB_URL, {}).pipe(
      tap((books: Book[]) => {
        this.bookshelfService.setBookshelfBooks(books);
      })
    );
  }
}
