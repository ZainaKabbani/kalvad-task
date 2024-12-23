import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { BookList } from '../../../models/book-list';
import { Book } from '../../../models/book';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBooksToListComponent } from '../add-books-to-list/add-books-to-list.component';
import { BookService } from '../../../services/book.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list-details',
  imports: [MatTableModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.scss',
})
export class ListDetailsComponent {
  readonly dialog = inject(MatDialog);
  listDetails = input<BookList>();
  displayedColumns: string[] = [
    'book-title',
    'year',
    'author-name',
    'stars',
    'actions',
  ];
  dataSource = new MatTableDataSource<Book>();

  constructor(
    private _bookService: BookService,
    private _cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.dataSource.data = this.listDetails()?.books || [];
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddBooksToListComponent, {
      data: { listId: this.listDetails()?.id },
    });

    dialogRef.componentInstance.bookAdded.subscribe((newBook: Book) => {
      const existingBooks = this.dataSource.data;
      const bookExists = existingBooks.some((book) => book.id === newBook.id);

      if (!bookExists) {
        this.dataSource.data = [...existingBooks, newBook];
      }
    });
  }

  public deleteBookFromList(bookId: string): void {
    this._bookService.removeBookFromList(
      this.listDetails()?.id as string,
      bookId
    );

    this.dataSource.data =
      this._bookService.getListById(this.listDetails()?.id as string)?.books ||
      [];
  }

  public reorder(): void {
    this._bookService.reorderBooksInListByStars(
      this.listDetails()?.id as string
    );

    this.dataSource.data =
      this._bookService.getListById(this.listDetails()?.id as string)?.books ||
      [];
  }
}
