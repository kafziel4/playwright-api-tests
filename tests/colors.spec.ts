import { expect, test } from '../fixtures/reqres-fixture';
import { colors } from '../helpers/colors';
import { headers, jsonContentType } from '../helpers/constants';
import { ColorList, SingleColor } from '../types/colors';

test('GET to /colors should return status 200 and a list of colors', async ({
  reqResRequests,
}) => {
  // Arrange
  const expectedResponse: ColorList = colors;

  // Act
  const response = await reqResRequests.getColors();

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: ColorList = await response.json();
  expect(responseBody).toMatchObject(expectedResponse);
});

test('GET to /colors/id for an existing color should return status 200 and the color data', async ({
  reqResRequests,
}) => {
  // Arrange
  const expectedResponse: SingleColor = {
    data: {
      id: 2,
      name: 'fuchsia rose',
      year: 2001,
      color: '#C74375',
      pantone_value: '17-2031',
    },
  };

  // Act
  const response = await reqResRequests.getSingleColor(
    expectedResponse.data.id
  );

  // Assert
  expect(response.status()).toBe(200);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody: SingleColor = await response.json();
  expect(responseBody).toMatchObject(expectedResponse);
});

test('GET to /colors/id for a color that does not exist should return status 404', async ({
  reqResRequests,
}) => {
  // Arrange
  const nonexistentId = 23;

  // Act
  const response = await reqResRequests.getSingleColor(nonexistentId);

  // Assert
  expect(response.status()).toBe(404);
  expect(response.headers()[headers.contentType]).toBe(jsonContentType);

  const responseBody = await response.json();
  expect(responseBody).toEqual({});
});
