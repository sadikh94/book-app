import { Component, OnInit } from '@angular/core';
import { Book } from './../book-model/book';
import { BooksService } from '../services/books.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-book-section',
  templateUrl: './book-section.component.html',
  styleUrls: ['./book-section.component.scss'],
})
export class BookSectionComponent implements OnInit {
  books!: Book[];
  originalBooks!: Book[];
  selectedCategoryId!: number | string;
  constructor(
    private booksService: BooksService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.onBookAdd();
    this.onCategorySelected();
    this.onShowFavorites();
    this.onBookEdit();
    this.onSeacrh();
  }

  private getBooks(): void {
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = [...books];
      this.originalBooks = [...books];
    });
  }

  private onSeacrh(): void {
    this.booksService.books$.subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  private onBookEdit(): void {
    this.booksService.onBookEdit$.subscribe((book: Book) => {
      const index = this.originalBooks.findIndex(
        (editedBook: Book) => editedBook.id === book.id
      );
      if (index !== -1) {
        this.originalBooks[index] = book;
        this.books[index] = book;
      }
    });
  }

  private onBookAdd(): void {
    this.booksService.onBookAdd$.subscribe((book: Book) => {
      this.originalBooks.push(book);
      this.books.push(book);
    });
  }

  private onCategorySelected(): void {
    this.categoryService.onCategorySelected$.subscribe(
      (genre: string | number) => {
        this.selectedCategoryId = genre;
        if (genre === -1) {
          this.books = this.originalBooks;
        } else {
          this.books = this.originalBooks.filter(
            (book: Book) => book.genre === genre
          );
        }
      }
    );
  }

  onDelete(bookToDelete: Book) {
    this.booksService.deleteBook(bookToDelete).subscribe(() => {
      const index = this.books.findIndex(
        (book: Book) => book.id === bookToDelete.id
      );
      this.books.splice(index, 1);
    });
  }

  addToFavorites(book: Book): void {
    this.booksService.updateFavorites(book).subscribe(() => {
      const index = this.originalBooks.findIndex(
        (favoriteBook: Book) => favoriteBook.id === book.id
      );
      this.originalBooks[index].favorite = book.favorite;
      console.log(this.books);
      console.log(this.selectedCategoryId);
      if (this.selectedCategoryId === -2) {
        this.books = this.originalBooks.filter((book: Book) => book.favorite);
      }
    });
  }

  private onShowFavorites(): void {
    this.booksService.onShowFavorites$.subscribe(
      (selectedCategoryId: number) => {
        this.books = this.originalBooks.filter((book: Book) => book.favorite);
        this.selectedCategoryId = selectedCategoryId;
      }
    );
  }
}
