export type Pagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type ErrorResponse = {
  error: string;
};
