import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginRequest } from '../types/login';
import { RegisterRequest } from '../types/register';
import { CreateUserRequest, UpdateUserRequest } from '../types/users';

export class ReqResRequests {
  private static readonly usersPath = 'users';
  private static readonly colorsPath = 'colors';
  private static readonly registerPath = 'register';
  private static readonly loginPath = 'login';

  constructor(private readonly request: APIRequestContext) {}

  async getUsers(page: number): Promise<APIResponse> {
    return await this.request.get(ReqResRequests.usersPath, {
      params: { page },
    });
  }

  async getSingleUser(id: number): Promise<APIResponse> {
    return await this.request.get(`${ReqResRequests.usersPath}/${id}`);
  }

  async postUser(body: CreateUserRequest): Promise<APIResponse> {
    return await this.request.post(ReqResRequests.usersPath, { data: body });
  }

  async putUser(id: number, body: UpdateUserRequest): Promise<APIResponse> {
    return await this.request.put(`${ReqResRequests.usersPath}/${id}`, {
      data: body,
    });
  }

  async patchUser(id: number, body: UpdateUserRequest): Promise<APIResponse> {
    return await this.request.patch(`${ReqResRequests.usersPath}/${id}`, {
      data: body,
    });
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return await this.request.delete(`${ReqResRequests.usersPath}/${id}`);
  }

  async getColors(): Promise<APIResponse> {
    return await this.request.get(ReqResRequests.colorsPath);
  }

  async getSingleColor(id: number): Promise<APIResponse> {
    return await this.request.get(`${ReqResRequests.colorsPath}/${id}`);
  }

  async postRegister(body: RegisterRequest): Promise<APIResponse> {
    return await this.request.post(ReqResRequests.registerPath, { data: body });
  }

  async postLogin(body: LoginRequest): Promise<APIResponse> {
    return await this.request.post(ReqResRequests.loginPath, { data: body });
  }
}
