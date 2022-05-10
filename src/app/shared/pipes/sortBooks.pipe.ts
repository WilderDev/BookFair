import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../book/book.model';

@Pipe({
  name: 'sortBooks',
})
export class SortBooksPipe implements PipeTransform {
  transform(bookArr: Book[], sortBy: string) {
    bookArr.sort((bookA: Book, bookB: Book) => {
      if (bookA[sortBy] < bookB[sortBy]) {
        return -1;
      } else if (bookA[sortBy] > bookB[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });

    return bookArr;
  }
}
