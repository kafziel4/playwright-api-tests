import { Pagination } from './common';

export type Color = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type SingleColor = {
  data: Color;
};

export type ColorList = Pagination & {
  data: Color[];
};
