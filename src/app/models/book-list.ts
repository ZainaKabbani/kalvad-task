import { Book } from './book';

export interface BookList {
  id: string;
  name: string;
  books: Book[];
}
