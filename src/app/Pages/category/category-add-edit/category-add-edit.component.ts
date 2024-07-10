import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categoryInterface';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent {

  categoryForm!: FormGroup;
  categor: ICategory[] = [];
  isEditing = false;
  categoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.initializeForm();
    // console.log(this.authorForm);
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.isEditing = true;
        this.loadCategoryDetails(this.categoryId);
      }
    });
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.categoryForm.controls[controlName].touched && this.categoryForm.controls[controlName].hasError(errorName);
  }

  loadCategoryDetails(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (category: ICategory) => {
        console.log(category);

        this.categoryForm.patchValue({
          _id: category._id,
          name: category.name,
          description: category.description
        });
      },
      (error) => {
        console.error('Error loading category details:', error);
      }
    )
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      if (this.isEditing) {
        this.updateCategory(formData);
      } else {
        this.addCategory(formData);
      }
    }
  }

  addCategory(categoryData: ICategory) {
    this.categoryService.addCategory(categoryData).subscribe(
      (response) => {
        console.log('category added:', response);
        this.router.navigate(['/home/categories/getAllCategories']);
      },
      (error) => {
        console.error('Error adding categories:', error);
      }
    )
  }

  updateCategory(categoryData: ICategory) {
    this.categoryService.updateCategory(categoryData).subscribe(
      (response) => {
        console.log('category updated:', response);
        this.router.navigate(['/home/categories/getAllCategories']);

      },
      (error) => {
        console.error('Error updating category:', error);
      }
    )
  }
}


