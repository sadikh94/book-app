import { CategoriesService } from './../../../services/categories.service';
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
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
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
export class EditBookComponent implements OnInit {
  categories!: Category[];
  coverUrl: string = '';
  showCover: boolean = false;
  editBookForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    private categoriesService: CategoriesService,
    private booksService: BooksService,

    @Inject(MAT_DIALOG_DATA) public book: Book
  ) {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    this.editBookForm = new FormGroup({
      title: new FormControl(this.book.title, Validators.required),
      genre: new FormControl(this.book.genre, Validators.required),
      description: new FormControl(this.book.description, Validators.required),
      cover: new FormControl(this.coverUrl, Validators.required),
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

  editBook() {
    const tempBook = {
      title: this.editBookForm.value.title!,
      genre: this.editBookForm.value.genre!,
      description: this.editBookForm.value.description!,
      cover: this.coverUrl,
      id: this.book.id,
    };
    this.booksService.editBook(tempBook).subscribe(() => {
      this.booksService.onBookEdit$.next(tempBook);
      this.dialogRef.close();
    });
  }
}
