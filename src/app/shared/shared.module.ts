import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookComponent } from './book/book.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [BookComponent, NotificationComponent], // Components, Directives, Pipes that we need across our application
  imports: [CommonModule, RouterModule, FormsModule], // Modules we need across multiples features / routes
  exports: [BookComponent, NotificationComponent, CommonModule, FormsModule]
})
export class SharedModule {}
