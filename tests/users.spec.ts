import { expect, test } from '../fixtures/reqres-fixture';
import {
  dateInISOFormat,
  headers,
  jsonContentType,
  oneToThreeDigits,
} from '../helpers/constants';
import { users } from '../helpers/users';
import {
  CreateUserRequest,
  CreateUserResponse,
  SingleUser,
  UpdateUserRequest,
  UpdateUserResponse,
  UserList,
} from '../types/users';

test('GET to /users should return status 200 and a list of users', async ({
  reqResRequests,
}) => {
  // Arrange
  const page = 2;
  const expectedResponse: UserList = users;

  // Act
  const response = await reqResRequests.getUsers(page);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: UserList = await response.json();
  expect(responseBody).toMatchObject(expectedResponse);
});

test('GET to /users/id for an existing user should return status 200 and the user data', async ({
  reqResRequests,
}) => {
  // Arrange
  const expectedResponse: SingleUser = {
    data: {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    },
  };

  // Act
  const response = await reqResRequests.getSingleUser(expectedResponse.data.id);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: SingleUser = await response.json();
  expect(responseBody).toMatchObject(expectedResponse);
});

test('GET to /users/id for a user that does not exist should return status 404', async ({
  reqResRequests,
}) => {
  // Arrange
  const nonexistentId = 23;

  // Act
  const response = await reqResRequests.getSingleUser(nonexistentId);

  // Assert
  expect(response.status()).toBe(404);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody = await response.json();
  expect(responseBody).toEqual({});
});

test('POST to /users with valid data should return status 201 and the user data', async ({
  reqResRequests,
}) => {
  // Arrange
  const requestBody: CreateUserRequest = {
    name: 'morpheus',
    job: 'leader',
  };

  // Act
  const response = await reqResRequests.postUser(requestBody);

  // Assert
  expect(response.status()).toBe(201);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: CreateUserResponse = await response.json();
  expect.soft(responseBody).toMatchObject(requestBody);
  expect.soft(responseBody.id).toMatch(oneToThreeDigits);
  expect.soft(responseBody.createdAt).toMatch(dateInISOFormat);
});

test('PUT to /users/id for an existing user with valid data should return status 200 and the user data', async ({
  reqResRequests,
}) => {
  // Arrange
  const id = 2;
  const requestBody: UpdateUserRequest = {
    name: 'morpheus',
    job: 'zion resident',
  };

  // Act
  const response = await reqResRequests.putUser(id, requestBody);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: UpdateUserResponse = await response.json();
  expect.soft(responseBody).toMatchObject(requestBody);
  expect.soft(responseBody.updatedAt).toMatch(dateInISOFormat);
});

test('PATCH to /users/id for an existing user with valid data should return status 200 and the user data', async ({
  reqResRequests,
}) => {
  // Arrange
  const id = 2;
  const requestBody: UpdateUserRequest = {
    name: 'morpheus',
    job: 'zion resident',
  };

  // Act
  const response = await reqResRequests.patchUser(id, requestBody);

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: UpdateUserResponse = await response.json();
  expect.soft(responseBody).toMatchObject(requestBody);
  expect.soft(responseBody.updatedAt).toMatch(dateInISOFormat);
});

test('DELETE to /users/id for an existing user should return status 204', async ({
  reqResRequests,
}) => {
  // Arrange
  const id = 2;

  // Act
  const response = await reqResRequests.deleteUser(id);

  // Assert
  expect(response.status()).toBe(204);
  expect(response.headers()[headers.contentLength]).toBe('0');
});
