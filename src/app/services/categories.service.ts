import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../book-model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  onCategorySelected$ = new Subject<string | number>();
  private apiUrl = 'http://localhost:3300/categories';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
}
