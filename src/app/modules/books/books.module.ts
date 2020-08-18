// ANGULAR DEPENDENCY
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PRIMENG MODULES
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

// COMPONENTS
import { BooksComponent } from './books.component';

// SERVICES
import { BookService } from '../../services/book/book.service';
import { CategoryService } from '../../services/category/category.service';

// ROUTING SETUP
const routes: Routes = [
  {
    path: '', component: BooksComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),

    // PRIME NG MODULES
    TableModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [BookService, CategoryService],
  declarations: [BooksComponent]
})
export class BooksModule { }
