// ANGULAR DEPENDENCY
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// EXTERNAL PRIMENG MODULES
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

// COMPONENTS
import { CategoryComponent } from './category.component';

// SERVICES
import { CategoryService } from '../../services/category/category.service';

// ROUTING SETUP
const routes: Routes = [
  {
    path: '', component: CategoryComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    // PRIMENG MODULES
    MessagesModule,
    MessageModule,
    TreeModule
  ],
  providers: [CategoryService, MessageService],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
