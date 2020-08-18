// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// EXTERNAL MODULES
import { Subscription } from 'rxjs';
import { MessageService, TreeNode } from 'primeng/api';

// SERVICES
import { CategoryService } from '../../services/category/category.service';

// INTERFACES
import { Category } from '../../models/category/category.interface';

// UTILS
import { CommonUtil } from '../../utils/common-util';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryList: Category[] = [];
  messages = [];
  selectedCategories: TreeNode[];

  /**
  * Subscription handle on destroy
  */
  subscription: Subscription;

  constructor(private categoryService: CategoryService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    // get categories and map subscription for unsubscribe on component destroy
    this.subscription = this.categoryService.getCategories().subscribe((response: Category[]) => {
      this.categoryList = CommonUtil.transformToTree(response, 'id', 'parent');
    });
  }

  /**
   * Function: searchByCategory()
   *
   * @description navigate to book page if single category selected else throw error.
   * @returns undefined
   */
  searchByCategory() {
    this.messageService.clear();
    if (!this.selectedCategories || this.selectedCategories.length !== 1) {
      const detail = !this.selectedCategories ? 'Please select one category to search books.' : 'only one category allowed for search books.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });

      // auto close message after 3 sec
      setTimeout(() => {
        this.messageService.clear();
      }, 3000);
      return;
    }
    // naviagate to book page with category
    this.router.navigate(['/books'], { queryParams: { category: this.selectedCategories[0].label } });
  }

  /**
    * Function: ngOnDestroy()
    *
    * @description destroy subscbription on component.
    * @returns undefined
    */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
