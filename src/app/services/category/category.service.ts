// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

// RX JS
import { catchError } from 'rxjs/operators';

// CONSTANTS
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Returns all categories
  getCategories() {
    return this.http.get(`${environment.API_URL}/categories`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}
