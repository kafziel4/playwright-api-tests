import { expect, test } from '../fixtures/reqres-fixture';
import {
  headers,
  jsonContentType,
  missingPassword,
} from '../helpers/constants';
import { ErrorResponse } from '../types/common';
import { RegisterRequest, RegisterResponse } from './../types/register';

test('POST to /register with valid data should return status 200 and the registration id and token', async ({
  reqResRequests,
}) => {
  // Arrange
  const requestBody: RegisterRequest = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };

  const expectedResponse: RegisterResponse = {
    id: 4,
    token: 'QpwL5tke4Pnpja7X4',
  };

  // Act
  const response = await reqResRequests.postRegister(requestBody);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: RegisterResponse = await response.json();
  expect(responseBody).toEqual(expectedResponse);
});

test('POST to /register with missing password should return status 400 and the validation error', async ({
  reqResRequests,
}) => {
  // Arrange
  const requestBody: RegisterRequest = {
    email: 'sydney@fife',
  };

  const expectedResponse: ErrorResponse = {
    error: missingPassword,
  };

  // Act
  const response = await reqResRequests.postRegister(requestBody);

  // Assert
  expect(response.status()).toBe(400);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: ErrorResponse = await response.json();
  expect(responseBody).toEqual(expectedResponse);
});
