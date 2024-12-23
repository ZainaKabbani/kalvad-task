import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book';
@Component({
  selector: 'app-add-books-to-list',
  imports: [MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: './add-books-to-list.component.html',
  styleUrl: './add-books-to-list.component.scss',
})
export class AddBooksToListComponent implements OnInit {
  readonly dialogData: { listId: string } = inject(MAT_DIALOG_DATA);

  availableBooks: Book[] = [];

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this.getAvailableBooks();
  }

  public getAvailableBooks(): void {
    this._bookService.availableBooks$.subscribe((books) => {
      this.availableBooks = books;
    });
  }

  public addToList(book: Book): void {
    this._bookService.addBookToList(book, this.dialogData.listId);
  }
}
