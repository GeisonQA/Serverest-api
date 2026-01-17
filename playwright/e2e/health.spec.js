// @ts-check
import { test, expect } from '@playwright/test';

test('Deve verificar se a api esta online', async ({ request }) => {

    const response = await request.get('https://serverest.dev')
    expect(response.status()).toBe(200);


});


