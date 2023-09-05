import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Book } from 'src/app/book-model/book';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Category } from 'src/app/book-model/category';
import { BooksService } from 'src/app/services/books.service';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AddBookComponent implements OnInit {
  categories!: Category[];
  coverUrl: string = '';
  showCover: boolean = false;
  addBookForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public book: Book
  ) {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
    this.addBookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      cover: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  getCover(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.coverUrl = event.target.result;
      };
    }
    if (!this.showCover) {
      this.showCover = true;
    }
  }

  addBook() {
    const tempBook = {
      title: this.addBookForm.value.title!,
      genre: this.addBookForm.value.genre!,
      description: this.addBookForm.value.description!,
      cover: this.coverUrl,
    };
    this.booksService.addBook(tempBook).subscribe((book: Book) => {
      this.booksService.onBookAdd$.next(book);
      this.dialogRef.close();
    });
  }
}
