import { Component, OnInit } from '@angular/core';
import { Category } from './../../book-model/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss'],
})
export class BookCategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number = -1;

  constructor(
    private categoryService: CategoriesService,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  showAllBooks(): void {
    this.selectedCategoryId = -1;
    this.categoryService.onCategorySelected$.next(this.selectedCategoryId);
  }

  filterByGenre(category: Category) {
    this.selectedCategoryId = category.id;
    this.categoryService.onCategorySelected$.next(category.genre);
  }

  showFavorites(): void {
    this.selectedCategoryId = -2;
    this.bookService.onShowFavorites$.next(this.selectedCategoryId);
  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
