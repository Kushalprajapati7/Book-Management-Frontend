import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/booksInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/book';

  constructor(private http:HttpClient, private router:Router) { }
  showAllBooks():Observable<IBook[]>{
    return this.http.get<IBook[]>(`${this.apiUrl}/allBook`)
  }

  addBook(book:IBook):Observable<IBook>{
    return this.http.post<IBook>(`${this.apiUrl}/addBook`, book)
  }

  getBookById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/bookById/${id}`);
  }
  
  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/updateBook/${book._id}`, book);
  }

  deleteBook(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteBook/${id}`)
  }
  
}
