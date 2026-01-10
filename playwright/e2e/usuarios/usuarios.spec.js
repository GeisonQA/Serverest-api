import { test, expect } from '@playwright/test'
import { userPayload } from '../../support/factories/user'
import { requisitionService } from '../../support/services/requisition'

test.describe('POST /usuarios', () => {
    let requisition;
    test.beforeEach(({ request }) => {
        requisition = requisitionService(request)
    })

    test('Deve permitir cadastrar um novo usuario', async ({ request }) => {


        const payloadDinamico = userPayload();

        const response = await requisition.requisition(payloadDinamico)
        expect(response.status()).toBe(201);

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Cadastro realizado com sucesso')
        expect(body).toHaveProperty('_id')
        expect(body).not.toHaveProperty('password')


    })

    test('Não deve permitir cadastrar um usuário com email já existente', async ({ request }) => {

        const payloadDinamico = userPayload();

        //Primeira condição: já ter um usuário cadastrado
        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201);

        //Segunda condição: tentar cadastrar o mesmo usuário novamente
        const response = await requisition.requisition(payloadDinamico)
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('message', 'Este email já está sendo usado');

    })

    test('Não deve permitir cadastrar um email inválido', async ({ request }) => {

        const payloadStatico = {
            nome: 'Geison souza',
            email: 'geison.souza$teste.com', //email inválido
            password: 'teste123',
            administrador: 'true'
        }

        const response = await requisition.requisition(payloadStatico)
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

        const response = await requisition.requisition(payloadStatico)
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

        const response = await requisition.requisition(payloadStatico)
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('password', 'password não pode ficar em branco');

    })



})

test.describe('GET /usuarios', () => {

    test('Deve listar os usuarios cadastrados', async ({ request }) => {

        const response = await request.get('https://serverest.dev/usuarios/')
       
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);
        expect(body).toHaveProperty('quantidade', body.quantidade);
        expect(body).toHaveProperty('usuarios', body.usuarios);
        expect(Array.isArray(body.usuarios)).toBeTruthy();
    })


});