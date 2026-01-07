// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Deve verificar se a api esta online', async ({ request }) => {

    const response = await request.get('https://serverest.dev/')
    expect(response.status()).toBe(200);


});

test('Deve permitir cadastrar um novo usuario', async ({ request }) => {

    const payloadDinamico = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: 'teste123',
        administrador: 'true'
    }

    const response = (await request.post('https://serverest.dev/usuarios', { data: payloadDinamico }))
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeDefined()


});
