import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-author-register',
  templateUrl: './author-register.component.html',
  styleUrls: ['./author-register.component.scss']
})
export class AuthorRegisterComponent {
  authorRegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autherService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorRegisterForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      biography: ['', Validators.required],
      nationality: ['', Validators.required],
      role: [{ value: 'author', disabled: true }, Validators.required]
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.authorRegisterForm.controls[controlName].touched && this.authorRegisterForm.controls[controlName].hasError(errorName);
  }
  onSubmit(): void {
    if (this.authorRegisterForm.valid) {
      const authorData = { ...this.authorRegisterForm.value, role: 'author' };
      this.autherService.registerAuthor(authorData).subscribe(
        (response) => {
          console.log("Auther Registerd !", response);
          
          this.router.navigate(['/login']);
        },
        (error:any) => {
          console.error('Registration error: ', error);
        }
      );
    }
  }
}

