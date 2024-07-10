import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/core/interfaces/booksInterface';
import { BookService } from 'src/app/core/services/book.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  books: IBook[] = [];

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.showAllBooks().subscribe(
      (response) => {
        this.books = response
        console.log(response);
        console.log(this.books);
      },
      (error) => {
        console.log(error);

      }
    )
  }

  onEditBook(book: IBook): void {
    console.log('Edit book:', book);
    this.router.navigate(['/home/books/editBook', book._id]);
  }


  onDeleteBook(book: IBook): void {
    console.log(this.books);

    if (!book._id) {
      throw new Error('Book not Found!')
    }
    this.bookService.deleteBook(book._id).subscribe(
      (response) => {
        this.books = this.books.filter((b) => b._id !== book._id);
        console.log("Book Deleted.", response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
