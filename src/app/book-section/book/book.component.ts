import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Book } from 'src/app/book-model/book';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import jsPDF from 'jspdf';
import { BooksService } from 'src/app/services/books.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],

  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: myCustomTooltipDefaults,
    },
  ],
  animations: [
    trigger('flipState', [
      state(
        'true',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      state(
        'false',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('true => false', animate('500ms ease-out')),
      transition('false => true', animate('500ms ease-in')),
    ]),
  ],
})
export class BookElementComponent implements OnInit {
  books!: Book[];
  toggleProperty = false;
  @Input() book!: Book;
  @Output() deleteBookEvent = new EventEmitter();
  @Output() addToFavoritesEvent = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private booksService: BooksService) {}

  ngOnInit(): void {}

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  onBookEdit(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  onReadMore(book: Book): void {
    const dialogRef = this.dialog.open(ReadMoreComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe((result: Book) => {
      if (result) {
        this.booksService.editBook(result);
      }
    });
  }

  generatePdf(): void {
    const pdf = new jsPDF('p', 'px', [512, 768]);
    const img = new Image();

    img.src = this.book.cover;
    pdf.addImage(img, 'jpg', 0, 0, 512, 768);
    pdf.addPage();

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    pdf.text(this.book.title, 256, 40, { align: 'center' }, { maxWidth: 380 });

    pdf.setFontSize(16);
    pdf.setTextColor(255, 197, 3);
    pdf.text(this.book.genre, 256, 60, { align: 'center' }, { maxWidth: 380 });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);

    const descriptionStartY = 80;
    const descriptionMaxHeight = 768;
    const fontSize = 14;

    let descriptionLines = pdf.splitTextToSize(this.book.description, 380, {
      maxWidth: 380,
    });
    let offsetY = descriptionStartY;

    for (const line of descriptionLines) {
      if (offsetY + fontSize > descriptionMaxHeight) {
        pdf.addPage();
        offsetY = descriptionStartY;
      }
      pdf.text(line, 56, offsetY);
      offsetY += fontSize + 5;
    }

    pdf.save(this.book.title + '.pdf');
  }

  deleteBook() {
    this.deleteBookEvent.emit();
  }

  addToFavorites() {
    this.book.favorite = !this.book.favorite;
    this.addToFavoritesEvent.emit(this.book);
  }
}
