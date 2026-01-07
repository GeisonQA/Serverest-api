import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('POST /usuarios', () => {

    test('Deve permitir cadastrar um novo usuario', async ({ request }) => {
        //
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const payloadDinamico = {
            nome: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            password: 'teste123',
            administrador: 'true'
        }

        const response = (await request.post('https://serverest.dev/usuarios', { data: payloadDinamico }))
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toHaveProperty('message', 'Cadastro realizado com sucesso');
        expect(body).toHaveProperty('_id')
        expect(body).not.toHaveProperty('password')


    })

    test('Não deve permitir cadastrar um usuário com email já existente', async ({ request }) => {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        const payloadDinamico = {
            nome: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            password: 'teste123',
            administrador: 'true'
        }
        //Primeira condição: já ter um usuário cadastrado
        const preCondition = (await request.post('https://serverest.dev/usuarios', { data: payloadDinamico }))
        expect(preCondition.status()).toBe(201);

        //Segunda condição: tentar cadastrar o mesmo usuário novamente
        const response = (await request.post('https://serverest.dev/usuarios', { data: payloadDinamico }))
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('message', 'Este email já está sendo usado');

    })

    test('Não deve permitir cadastrar um email inválido', async ({ request }) => {

        const payloadStatico = {
            nome: 'Geison souza',
            email: 'geison.souza$teste', //email inválido
            password: 'teste123',
            administrador: 'true'
        }

        const response = (await request.post('https://serverest.dev/usuarios', { data: payloadStatico }))
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('email', 'email deve ser um email válido');

    })

    test('Não deve permitir cadastrar sem informar nome', async ({ request }) => {

        const payloadStatico = {
            nome: '',
            email: 'geison.souza@teste',
            password: 'teste123',
            administrador: 'true'
        }

        const response = (await request.post('https://serverest.dev/usuarios', { data: payloadStatico }))
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('nome', 'nome não pode ficar em branco');

    })

    test('Não deve permitir cadastrar sem informar senha', async ({ request }) => {

        const payloadStatico = {
            nome: 'Geison souza',
            email: 'geison.souza@teste',
            password: '',
            administrador: 'true'
        }

        const response = (await request.post('https://serverest.dev/usuarios', { data: payloadStatico }))
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('password', 'password não pode ficar em branco');

    })



})

test.describe('GET /usuarios', () => {

    test('Deve listar os usuarios cadastrados', async ({ request }) => {

        const response = await request.get('https://serverest.dev/usuarios')
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('quantidade', body.quantidade);
        expect(body).toHaveProperty('usuarios', body.usuarios);
        expect(Array.isArray(body.usuarios)).toBeTruthy();
    })


});