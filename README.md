To run project 

npm install
npm start 

project will start on http://localhost:4200 and dummy api will run on http://localhost:3000 using json-server

In App component Navbar tabs configured with two routes. Category and Books

In http://localhost:4200/category

  In this component categories are display in tree view default expanded. user can select multiple categories but search with single only.

  On click of search button if single category selected it will navigate to books page with selected category else it throw error using MessageService.

In http://localhost:4200/books or http://localhost:4200/books?category=art&design

  In this component books display in table view using primeng table. filter, soeting, scrolling, paging implemented.

  Column wise filter not implemented. seems its not in scope. if needed will implement.