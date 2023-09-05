import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from '../book-model/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  onBookAdd$ = new Subject<Book>();
  onShowFavorites$ = new Subject<number>();
  onBookEdit$ = new Subject<Book>();
  books$ = new Subject<Book[]>();
  favoriteBook$ = new BehaviorSubject<Book[]>([]);
  private apiUrl = 'http://localhost:3300/books';

  constructor(private http: HttpClient) {
    this.getFavoriteBooks().subscribe((favorites: Book[]) => {
      this.favoriteBook$.next(favorites);
    });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  deleteBook(book: Book): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${book.id}`);
  }

  addBook(book: any): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  private getFavoriteBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?favorite=true`);
  }

  updateFavorites(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }
}
