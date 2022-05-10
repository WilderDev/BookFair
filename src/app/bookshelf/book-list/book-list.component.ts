import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../shared/book/book.model';
import { BookshelfService } from '../bookshelf.service';

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit, OnDestroy {
  private bookListSub: Subscription;
  myBooks: Book[] = [];
  sortField = "author";

  constructor(
    private bookshelfService: BookshelfService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Populate local "myBooks" array with global "myBookshelfBooks" array
    this.myBooks = this.bookshelfService.getBookshelfBooks();

    // Listen for changes on the global "myBookshelfBooks" array -> Update our local "myBooks" array
    this.bookListSub = this.bookshelfService.onBooksChanged.subscribe(
      updatedBooks => {
        console.log("updatedBooks:", updatedBooks);
        this.myBooks = updatedBooks;
      }
    );
  }

  ngOnDestroy() {
    this.bookListSub.unsubscribe();
  }

  onRemoveBookFromBookshelf(idx: number) {
    this.bookshelfService.removeBookFromBookshelf(idx);
  }

  onAddNewBook() {
    // navigate to "/bookshelf/new"
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onSortBooks() {
    this.sortField = this.sortField == "author" ? "title" : "author";
  }
}
