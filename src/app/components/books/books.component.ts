import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
@Component({
  selector: 'app-books',
  imports: [MatTableModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['book-title', 'year', 'author-name'];
  dataSource = new MatTableDataSource<Book>();

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks(): void {
    this._bookService.availableBooks$.subscribe((books) => {
      this.dataSource.data = books;
    });
  }
}
