import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';
import { BookList } from '../models/book-list';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private availableBooksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.generateId(),
      title: 'Dune',
      year: 1965,
      author: 'Frank Herbert',
      stars: 2,
    },
    {
      id: this.generateId(),
      title: "Ender's Game",
      year: 1985,
      author: 'Orson Scott Card',
      stars: 5,
    },
    {
      id: this.generateId(),
      title: '1984',
      year: 1949,
      author: 'George Orwell',
      stars: 4,
    },
    {
      id: this.generateId(),
      title: 'Fahrenheit 451',
      year: 1953,
      author: 'Ray Bradbury',
      stars: 1,
    },
    {
      id: this.generateId(),
      title: 'Brave New World',
      year: 1932,
      author: 'Aldous Huxley',
      stars: 5,
    },
  ]);

  private bookListsSubject = new BehaviorSubject<BookList[]>([]);

  availableBooks$ = this.availableBooksSubject.asObservable();
  bookLists$ = this.bookListsSubject.asObservable();

  public getBooks(): Book[] {
    return this.availableBooksSubject.value;
  }

  public getLists(): BookList[] {
    return this.bookListsSubject.value;
  }

  public getListById(id: string): BookList | undefined {
    return this.bookListsSubject.value.find((list) => list.id === id);
  }

  public addBookList(name: string): void {
    if (name.trim()) {
      const newBookList: BookList = {
        id: this.generateId(),
        name,
        books: [],
      };
      this.bookListsSubject.next([...this.bookListsSubject.value, newBookList]);
    }
  }

  public removeList(id: string): void {
    const updatedLists = this.bookListsSubject.value.filter(
      (list) => list.id !== id
    );
    this.bookListsSubject.next(updatedLists);
  }

  public addBookToList(book: Book, listId: string): boolean {
    const lists = this.bookListsSubject.value.map((list) => {
      if (list.id === listId) {
        const bookExists = list.books.some(
          (existingBook) => existingBook.id === book.id
        );
        if (bookExists) {
          return list;
        }
        return {
          ...list,
          books: [...list.books, book],
        };
      }
      return list;
    });
    this.bookListsSubject.next(lists);
    return true;
  }

  public removeBookFromList(listId: string, bookId: string): void {
    const lists = this.bookListsSubject.value.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          books: list.books.filter((book) => book.id !== bookId),
        };
      }
      return list;
    });
    this.bookListsSubject.next(lists);
  }

  public reorderBooksInListByStars(listId: string): void {
    const lists = this.bookListsSubject.value.map((list) => {
      if (list.id === listId) {
        const sortedBooks = list.books.sort((a, b) => b.stars - a.stars);

        return {
          ...list,
          books: sortedBooks,
        };
      }
      return list;
    });

    this.bookListsSubject.next(lists);
  }
}
