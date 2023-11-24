import request from 'supertest';
import { jest } from '@jest/globals';
import { app } from '../server';
import * as controllers from './MembersController';
import { pool } from '../Configuration/dbConfig';

interface MssqlMock {
    ConnectionPool: jest.Mock;
    connect: jest.Mock;
}

jest.mock('../Configuration/dbConfig', () => {
    const mssql: MssqlMock = jest.requireActual('mssql');
    return {
        pool: new mssql.ConnectionPool(),
        connect: jest.fn(),
    };
});

describe('Member Controller Tests', () => {
    beforeAll(async () => {
        await pool.connect();
    });

    afterAll(async () => {
        await pool.close();
    });

    test('should register a new member', async () => {
        const newMemberData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@thejitu.com',
            cohortNumber: 17,
        };

        const response = await request(app)
            .post('/members')
            .send(newMemberData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Member registered successfully');
    });
});

    test('should update a member', async () => {
        const newMemberData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@thejitu.com',
            cohortNumber: 17,
        };
        const response = await request(app)
            .put('/members/1')
            .send({ newMemberData });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Member updated successfully');
    });

    test('should fetch one member', async () => {
        const response = await request(app).get('/members/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty();
    });
