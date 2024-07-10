import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { IAuhtor } from 'src/app/core/interfaces/authorInterface';
import { ICategory } from 'src/app/core/interfaces/categoryInterface';
import { IBook } from 'src/app/core/interfaces/booksInterface';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  bookForm!: FormGroup;
  authors: IAuhtor[] = [];
  categories: ICategory[] = [];
  isEditing = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadAuthors();
    this.loadCategories();

    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      if (this.bookId) {
        this.isEditing = true;
        this.loadBookDetails(this.bookId);
      }
    });
  }

  initializeForm() {
    this.bookForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      ISBN: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  loadAuthors() {
    this.authorService.showAllAuhtors().subscribe(
      (data) => {
        this.authors = data;
      },
      (error) => {
        console.error('Error loading authors:', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.showAllCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadBookDetails(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (book: IBook) => {
        this.bookForm.patchValue({
          _id: book._id,
          title: book.title,
          author: book.author_name,
          category: book.category_name, 
          ISBN: book.ISBN,
          description: book.description,
          price: book.price
        });
      },
      (error) => {
        console.error('Error loading book details:', error);
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.bookForm.controls[controlName].touched && this.bookForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      if (this.isEditing) {
        this.updateBook(formData);
      } else {
        this.addBook(formData);
      }
    }
  }

  addBook(bookData: IBook) {
    this.bookService.addBook(bookData).subscribe(
      (response) => {
        console.log('Book added:', response);
        this.router.navigate(['/home/books/getAllBooks']);
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  updateBook(bookData: IBook) {
    this.bookService.updateBook(bookData).subscribe(
      (response) => {
        console.log('Book updated:', response);
        this.router.navigate(['/home/books/getAllBooks']);
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }
}
