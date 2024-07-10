import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuhtor } from 'src/app/core/interfaces/authorInterface';
import { AuthorService } from 'src/app/core/services/author.service';
import { countries } from 'src/app/core/services/country-data-store';

@Component({
  selector: 'app-author-add-edit',
  templateUrl: './author-add-edit.component.html',
  styleUrls: ['./author-add-edit.component.scss']
})
export class AuthorAddEditComponent implements OnInit {
  public countries: any = countries

  authorForm!: FormGroup;
  authors: IAuhtor[] = [];
  isEditing = false;
  authorId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.initializeForm();
    // console.log(this.authorForm);
    this.route.paramMap.subscribe(params => {
      this.authorId = params.get('id');
      if (this.authorId) {
        this.isEditing = true;
        this.loadAuthorDetails(this.authorId);
      }
    });
  }


  initializeForm() {
    this.authorForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      biography: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      role: ['author', [Validators.required]],
    });
    // this.authorForm.get('role')?.disable();

  }

  hasError(controlName: string, errorName: string): boolean {
    return this.authorForm.controls[controlName].touched && this.authorForm.controls[controlName].hasError(errorName);
  }


  addAuthor(auhtorData: IAuhtor) {
    this.authorService.registerAuthor(auhtorData).subscribe(
      (response) => {
        console.log('Author added:', response);
        this.router.navigate(['/home/authors/getAllAuthors']);
      },
      (error) => {
        console.error('Error adding Author:', error);
      }
    )
  }
  onSubmit() {
    if (this.authorForm.valid) {
    const formData = this.authorForm.value;
      if (this.isEditing) {
        this.updateAuhor(formData);
      } else {
        this.addAuthor(formData);
      }
    }

  }

  loadAuthorDetails(authorId: string) {
    this.authorService.getAuthorById(authorId).subscribe(
      (author: IAuhtor) => {
        console.log(author);
        
        this.authorForm.patchValue({
          _id: author._id,
          name: author.name,
          email: author.email,
          biography: author.biography,
          nationality: author.nationality,
          role: author.role
        });
      },
      (error) => {
        console.error('Error loading Author details:', error);
      }
    )
  }
  updateAuhor(auhtorData:IAuhtor) {
    this.authorService.updateAuthor(auhtorData).subscribe(
      (response) => {
        console.log('Author updated:', response);
        this.router.navigate(['/home/authors/getAllAuthors']);
      },
      (error) => {
        console.error('Error updating Author:', error);
      }
    )
  }
}
