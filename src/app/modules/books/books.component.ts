import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// EXTERNAL MODULES
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Table } from 'primeng/table';

// SERVICES
import { BookService } from '../../services/book/book.service';

// CONSTANTS
import { BOOK_COLUMNS, FILTER_OPTIONS } from './books.constant';

// INTERFACES
import { Book } from '../../models/book/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {

  columns = BOOK_COLUMNS;
  bookList: Book[] = [];

  filterText = '';
  selectedFilterType = 'category';
  filterTypes = FILTER_OPTIONS;

  queryParams;;

  @ViewChild('table') table: Table;
  /**
  * Subscription handle on destroy
  */
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    // get books and add subscription for unsubscribe on component destroy
    this.subscriptions.push(this.bookService.getBooks().subscribe((response: Book[]) => {
      console.log(response);
      this.bookList = response;
    }));

    // get query params for default filter and add subscription for unsubscribe on component destroy
    this.subscriptions.push(this.route.queryParams.pipe(filter(params => params.category)).subscribe(params => {
      if (this.table) {
        this.defaultFilter(params);
        return;
      }
      this.queryParams = params;
    }));
  }

  ngAfterViewInit() {
    if (this.queryParams) {
      // if data will come before table view child rendered
      // re filter query params
      this.defaultFilter(this.queryParams);
    }
  }

  /**
   * Function: defaultFilter()
   *
   * @description default filter used for category filter in primeng.
   * @param params query params for filter.
   * @returns undefined
   */
  defaultFilter(params) {
    this.table.reset();
    this.filterText = params.category;
    this.table.filter(params.category, 'category', 'equals');
  }

  /**
   * Function: onFilterTypeChange()
   *
   * @description reset table filter and search value on change of filter by.
   * @returns undefined
   */
  onFilterTypeChange() {
    this.table.reset();
    this.filterText = '';
  }


  /**
   * Function: onSearch()
   *
   * @description search value on change of input in primeng table.
   * @returns undefined
   */
  onSearch(event) {
    if (this.selectedFilterType) {
      this.table.filter(event.target.value, this.selectedFilterType, 'contains');
    }
  }


  /**
   * Function: onSearch()
   *
   * @description custom sorting function to handle date and number type in primeng table.
   * @param event it contains data, field and order(asc, desc).
   * @returns undefined
   */
  onSort(event) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      // sort for date
      if (event.field === 'published') {
        const date1 = new Date(value1);
        const date2 = new Date(value2);

        let result: number = -1;
        if (date1 > date2) { result = 1; }

        return result * event.order;
      }

      // sort for number
      if (event.field === 'sell') {
        const number1 = parseFloat(value1);
        const number2 = parseFloat(value2);

        let result: number = -1;
        if (number1 > number2) { result = 1; }

        return result * event.order;
      }

      // inbuilt logic
      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  /**
  * Function: ngOnDestroy()
  *
  * @description destroy all subscbription on component.
  * @returns undefined
  */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub && sub.unsubscribe();
    })
  }

}
