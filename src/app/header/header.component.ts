import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../book-section/book/add-book/add-book.component';
import { Book } from '../book-model/book';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  books!: Book[];
  searchValue: string = '';
  filteredBooks!: Book[];
  private searchSubscription: Subscription | undefined;

  constructor(private dialog: MatDialog, private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
    this.searchSubscription = fromEvent(document, 'keydown')
      .pipe(debounceTime(400))
      .subscribe(() => this.filterOnSearch(this.searchValue));
    this.onBookEdit();
  }

  private onBookEdit(): void {
    this.booksService.onBookEdit$.subscribe((book: Book) => {
      const index = this.books.findIndex(
        (editedBook: Book) => editedBook.id === book.id
      );
      if (index !== -1) {
        this.books[index] = book;
      }
    });
  }

  private filterOnSearch(searchValue: string): void {
    this.filteredBooks = this.books.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.booksService.books$.next(this.filteredBooks);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearch(event: any) {
    if (event.keyCode === 13 || event.type === 'click') {
      this.filterOnSearch(this.searchValue);
    }
  }

  onBookAdd(): void {
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe(() => {});
  }
}
