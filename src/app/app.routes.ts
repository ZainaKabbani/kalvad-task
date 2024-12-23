import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/books/books.component').then(
        (c) => c.BooksComponent
      ),
  },
  {
    path: 'lists',
    loadComponent: () =>
      import('./components/books-lists/books-lists.component').then(
        (c) => c.BooksListsComponent
      ),
  },
];
