// PRIME NG TABLE COLUMNS FOR BOOKS
export const BOOK_COLUMNS = [
  { field: 'bookName', header: 'Book Name', type: 'string' },
  { field: 'author', header: 'Author', type: 'string' },
  { field: 'category', header: 'Category', type: 'string' },
  { field: 'published', header: 'Published', type: 'date' },
  { field: 'sell', header: 'Sold', type: 'number' }
];

// FILTER BY OPTIONS
export const FILTER_OPTIONS = [
  { label: 'Category', value: 'category' },
  { label: 'Book Name', value: 'bookName' },
];