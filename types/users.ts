import { Pagination } from './common';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SingleUser = {
  data: User;
};

export type UserList = Pagination & {
  data: User[];
};

export type CreateUserRequest = {
  name: string;
  job: string;
};

export type UpdateUserRequest = {
  name: string;
  job: string;
};

export type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

export type UpdateUserResponse = {
  name: string;
  job: string;
  updatedAt: string;
};
