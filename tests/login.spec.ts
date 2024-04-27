import { expect, test } from '../fixtures/reqres-fixture';
import {
  headers,
  jsonContentType,
  missingPassword,
} from '../helpers/constants';
import { ErrorResponse } from '../types/common';
import { LoginRequest, LoginResponse } from './../types/login';

test('POST to /login with valid data should return status 200 and the login token', async ({
  reqResRequests,
}) => {
  // Arrange
  const requestBody: LoginRequest = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };

  const expectedResponse: LoginResponse = {
    token: 'QpwL5tke4Pnpja7X4',
  };

  // Act
  const response = await reqResRequests.postLogin(requestBody);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: LoginRequest = await response.json();
  expect(responseBody).toEqual(expectedResponse);
});

test('POST to /login with missing password should return status 400 and the validation error', async ({
  reqResRequests,
}) => {
  // Arrange
  const requestBody: LoginRequest = {
    email: 'peter@klaven',
  };

  const expectedResponse: ErrorResponse = {
    error: missingPassword,
  };

  // Act
  const response = await reqResRequests.postLogin(requestBody);

  // Assert
  expect(response.status()).toBe(400);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: ErrorResponse = await response.json();
  expect(responseBody).toEqual(expectedResponse);
});
