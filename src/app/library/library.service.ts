import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  bookListChanged = new Subject<Book[]>();

  private allLibraryBooks: Book[] = [];

  // READ (many)
  getLibraryBooks() {
    return this.allLibraryBooks.slice();
  }

  //
  saveBooksFromAPI(books) {
    books.map((book) => {
      // Destructure the relevant book properties
      const { title, author_name } = book;

      // Create a new Book
      const newBook = new Book(
        title,
        author_name ? author_name[0] : 'unknown',
        'unknown',
        'https://tse2.mm.bing.net/th?id=OIP.I6LGwie40Vw4K8gmV52MKwHaLc&pid=Api&P=0&w=300&h=300'
      );

      // Add it to the "allLibraryBooks" array
      this.allLibraryBooks.push(newBook);
    });

    this.bookListChanged.next(this.allLibraryBooks.slice());
  }
}
