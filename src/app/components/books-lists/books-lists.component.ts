import { Component, inject, OnInit } from '@angular/core';
import { ListDetailsComponent } from './list-details/list-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddListComponent } from './add-list/add-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookList } from '../../models/book-list';
import { BookService } from '../../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-books-lists',
  imports: [
    ListDetailsComponent,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './books-lists.component.html',
  styleUrl: './books-lists.component.scss',
})
export class BooksListsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  selectedListDetails: BookList | undefined = undefined;

  lists: BookList[] = [];

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this.loadLists();
  }

  public loadLists(): void {
    this._bookService.bookLists$.subscribe((lists) => {
      this.lists = lists;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this._bookService.addBookList(result);
    });
  }

  public deleteList(id: string): void {
    this._bookService.removeList(id);
  }

  public showDetails(id: string) {
    this.selectedListDetails = this._bookService.getListById(id);
  }
}
