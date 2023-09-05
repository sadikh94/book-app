import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../book-model/book';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  resized: boolean = false;
  book!: Book;

  constructor(private dialog: MatDialog, private booksService: BooksService) {}

  ngOnInit(): void {}

  sideBarResize() {
    this.resized = !this.resized;
  }

  aboutClick(book: Book): void {
    const dialogRef = this.dialog.open(AboutComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((result: Book) => {
      if (result) {
        this.booksService.editBook(result);
      }
    });
  }
}
