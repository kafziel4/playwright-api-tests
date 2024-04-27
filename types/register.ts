export type RegisterRequest = {
  email: string;
  password?: string;
};

export type RegisterResponse = {
  id: number;
  token: string;
};
