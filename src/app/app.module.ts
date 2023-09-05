import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookSectionComponent } from './book-section/book-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookCategoryComponent } from './sidebar/book-category/book-category.component';
import { BookElementComponent } from './book-section/book/book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportsModule } from 'src/shared/material-imports';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BookSectionComponent,
    BookCategoryComponent,
    BookElementComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialImportsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
