import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookshelfService } from '../../bookshelf/bookshelf.service';
import { Book } from '../book/book.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  addBookSub: Subscription;

  constructor(private bookshelfService: BookshelfService) {}

  ngOnInit(): void {
    this.addBookSub = this.bookshelfService.saveLibraryBookSubject.subscribe(
      (bookDetails: Book) => {
        alert(
          `Successfully added: ${bookDetails.title} by ${bookDetails.author}!`
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.addBookSub.unsubscribe();
  }
}
