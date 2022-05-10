import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookshelfService } from '../bookshelf.service';
import { Book } from '../../shared/book/book.model';

@Component({
  selector: 'app-bookshelf-editor',
  templateUrl: './bookshelf-editor.component.html',
  styleUrls: ['./bookshelf-editor.component.css'],
})
export class BookshelfEditorComponent implements OnInit {
  idx: number;
  isEditMode = false;

  bookDetails: Book = {
    title: '',
    author: '',
    genre: '',
    coverImg: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookshelfService: BookshelfService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idx = +params['id'];
      this.isEditMode = params['id'] != null;

      if (this.isEditMode == true) {
        this.bookDetails = this.bookshelfService.getBookshelfBook(this.idx);
      }
    });
  }

  onBookFormSubmit(formObj: NgForm) {
    // 1. Destructure the "formObj" values
    const { title, author, genre, coverImg } = formObj.value;

    // 2. Set the local "bookDetails" obj to the "formObj" values
    this.bookDetails = new Book(title, author, genre, coverImg);

    // 3. Conditionally call different methods depending on what "mode" we are in
    if (this.isEditMode == true) {
      // Edit an existing book
      this.bookshelfService.updateBookshelfBook(this.idx, this.bookDetails);
    } else {
      // Add a new book
      this.bookshelfService.saveBookToBookshelf(this.bookDetails);
    }

    // 4. Reset the form
    this.onResetForm();
  }

  onResetForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
