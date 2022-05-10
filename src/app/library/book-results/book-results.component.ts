import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book/book.model';
import { LibraryService } from '../library.service';
import { BookshelfService } from '../../bookshelf/bookshelf.service';

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css'],
})
export class BookResultsComponent implements OnInit {
  // 1. Create a local "libraryBooks" array
  libraryBooks: Book[] = [];

  constructor(
    private libraryService: LibraryService,
    private bookshelfService: BookshelfService
  ) {} // 2. Inject the libraryService into this component

  ngOnInit(): void {
    // 3. Get the global "allLibraryBooks" array -> store those in the local "libraryBooks" array
    this.libraryBooks = this.libraryService.getLibraryBooks();

    // Subscribe
    this.libraryService.bookListChanged.subscribe((updatedBooks: Book[]) => {
      this.libraryBooks = updatedBooks;
    });
  }

  addBookToBookshelf(book: Book) {
    this.bookshelfService.saveBookToBookshelf(book);
    this.bookshelfService.saveLibraryBookSubject.next(book);
  }
}
