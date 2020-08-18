import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ROUTING SETUP
const routes: Routes = [
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule'
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },
  { path: '', pathMatch: 'full', redirectTo: 'category' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UiModulesRouting { }
