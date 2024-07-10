import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/categoryInterface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/category';
  constructor(private http: HttpClient, private router: Router) { }

  showAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/allCategory`)
  }

  addCategory(categoryData: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.apiUrl}/addCategory`, categoryData)
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/categoryById/${id}`);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/updateCategory/${category._id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteCategory/${id}`)
  }

}
