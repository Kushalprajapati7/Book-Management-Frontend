import { Component } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/categoryInterface';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  constructor(private categoryService: CategoryService) { }
  categories: ICategory[] = [];
  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.showAllCategory().subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);

      })
  }

  onEditCategory(category: any) {
    console.log(category);

  }
  onDeleteCategory(category: any) {
    if (!category._id) {
      throw new Error('Category not Found!')
    }
    this.categoryService.deleteCategory(category._id).subscribe(
      (response) => {
        this.categories = this.categories.filter((c) => c._id !== category._id);
        console.log("Category Deleted.", response);
      },
      (error) => {
        console.log(error);

      }
    )

  }

}

