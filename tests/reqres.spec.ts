import { expect, test } from '@playwright/test';
import { colors } from '../fixtures/colors';
import { users } from '../fixtures/users';

test.describe('ReqRes API', () => {
  const oneToThreeDigits = /^\d{1,3}$/;
  const dateInISOFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  test('GET to /users should return status 200 and a list of users', async ({ request }) => {
    // Act
    const response = await request.get('users', { params: { page: 2 } });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject(users);
  });

  test('GET to /users/id for an existing user should return status 200 and the user data', async ({ request }) => {
    // Act
    const response = await request.get('users/2');

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({
      data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      },
    });
  });

  test('GET to /users/id for a user that does not exist should return status 404', async ({ request }) => {
    // Act
    const response = await request.get('users/23');

    // Assert
    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toEqual({});
  });

  test('GET to /colors should return status 200 and a list of colors', async ({ request }) => {
    // Act
    const response = await request.get('colors');

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject(colors);
  });

  test('GET to /colors/id for an existing color should return status 200 and the color data', async ({ request }) => {
    // Act
    const response = await request.get('colors/2');

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({
      data: {
        id: 2,
        name: 'fuchsia rose',
        year: 2001,
        color: '#C74375',
        pantone_value: '17-2031',
      },
    });
  });

  test('GET to /colors/id for a color that does not exist should return status 404', async ({ request }) => {
    // Act
    const response = await request.get('colors/23');

    // Assert
    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toEqual({});
  });

  test('POST to /users with valid data should return status 201 and the user data', async ({ request }) => {
    // Arrange
    const requestBody = {
      name: 'morpheus',
      job: 'leader',
    };

    // Act
    const response = await request.post('users', { data: requestBody });

    // Assert
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');

    const responseBody = await response.json();
    expect.soft(responseBody).toMatchObject({
      name: requestBody.name,
      job: requestBody.job,
    });
    expect.soft(responseBody.id).toMatch(oneToThreeDigits);
    expect.soft(responseBody.createdAt).toMatch(dateInISOFormat);
  });

  test('PUT to /users/id for an existing user with valid data should return status 200 and the user data', async ({
    request,
  }) => {
    // Arrange
    const requestBody = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    const response = await request.put('users/2', { data: requestBody });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');

    const responseBody = await response.json();
    expect.soft(responseBody).toMatchObject({
      name: requestBody.name,
      job: requestBody.job,
    });
    expect.soft(responseBody.updatedAt).toMatch(dateInISOFormat);
  });

  test('PATCH to /users/id for an existing user with valid data should return status 200 and the user data', async ({
    request,
  }) => {
    // Arrange
    const requestBody = {
      name: 'morpheus',
      job: 'zion resident',
    };

    // Act
    const response = await request.patch('users/2', { data: requestBody });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');

    const responseBody = await response.json();
    expect.soft(responseBody).toMatchObject({
      name: requestBody.name,
      job: requestBody.job,
    });
    expect.soft(responseBody.updatedAt).toMatch(dateInISOFormat);
  });

  test('DELETE to /users/id for an existing user should return status 204', async ({ request }) => {
    // Act
    const response = await request.delete('users/2');

    // Assert
    expect(response.status()).toBe(204);
    expect(response.headers()['content-length']).toBe('0');
  });

  test('POST to /register with valid data should return status 200 and the registration id and token', async ({
    request,
  }) => {
    // Arrange
    const requestBody = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    // Act
    const response = await request.post('register', { data: requestBody });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({
      id: 4,
      token: 'QpwL5tke4Pnpja7X4',
    });
  });

  test('POST to /register with missing password should return status 400 and the validation error', async ({
    request,
  }) => {
    // Arrange
    const requestBody = { email: 'sydney@fife' };

    // Act
    const response = await request.post('register', { data: requestBody });

    // Assert
    expect(response.status()).toBe(400);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({ error: 'Missing password' });
  });

  test('POST to /login with valid data should return status 200 and the login token', async ({ request }) => {
    // Arrange
    const requestBody = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    // Act
    const response = await request.post('login', { data: requestBody });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({ token: 'QpwL5tke4Pnpja7X4' });
  });

  test('POST to /login with missing password should return status 400 and the validation error', async ({
    request,
  }) => {
    // Arrange
    const requestBody = { email: 'peter@klaven' };

    // Act
    const response = await request.post('login', { data: requestBody });

    // Assert
    expect(response.status()).toBe(400);
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(await response.json()).toMatchObject({ error: 'Missing password' });
  });
});
