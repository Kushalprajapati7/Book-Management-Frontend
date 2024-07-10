import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuhtor } from '../interfaces/authorInterface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://localhost:3000/api/author';
  constructor(private http:HttpClient, private router:Router) { }

  registerAuthor(authorData:IAuhtor):Observable<IAuhtor>{
    return this.http.post<IAuhtor>(`${this.apiUrl}/addAuthor`, authorData)
  }

  showAllAuhtors():Observable<IAuhtor[]>{
    return this.http.get<IAuhtor[]>(`${this.apiUrl}/allAuthor`)
  }

  getAuthorById(id: string): Observable<IAuhtor> {
    return this.http.get<IAuhtor>(`${this.apiUrl}/authorById/${id}`);
  }
  
  updateAuthor(author: IAuhtor): Observable<IAuhtor> {
    return this.http.put<IAuhtor>(`${this.apiUrl}/updateAuthor/${author._id}`, author);
  }

  deleteAuthpr(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteAuthor/${id}`)
  }
}
