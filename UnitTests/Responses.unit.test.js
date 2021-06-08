import { test } from '@jest/globals';
import Responses from '../lambdas/common/Responses'

test('Responses is an function', () => {
    expect(typeof Responses).toBe('function');
});

test('response works', () => {
    const res = Responses.response(201, {name: 'alaa'});
    expect(res.statusCode).toBe(201);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json');
})

test('_200 works', () => {
    const res = Responses._200({name: 'alaa'});
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json');
})

test('_400 works', () => {
    const res = Responses._400({name: 'alaa'});
    expect(res.statusCode).toBe(400);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json');
})